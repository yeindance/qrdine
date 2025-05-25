import { HttpException, HttpStatus, Injectable, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataSource, EntityManager, TypeORMError } from 'typeorm'
import { Menu, Order, OrderItem, Seat, Staff } from './entities'
import { GqlValidationEx } from '@shared/exceptions'

@Injectable()
export class DbService implements OnModuleDestroy {
  private connections: Map<string, DataSource> = new Map()

  constructor(private configService: ConfigService) {}

  async createEm(name: string) {
    return (await this.getDb(name)).createEntityManager()
  }

  async createQr(name: string) {
    return (await this.getDb(name)).createQueryRunner()
  }

  async getDb(name: string) {
    const postgres = this.configService.get('database.postgres')

    const dbName: string = name || postgres.name
    const existingConnection = this.connections.get(dbName)

    if (!existingConnection) {
      const dataSource = new DataSource({
        type: 'postgres',
        host: postgres.host,
        port: postgres.port,
        username: postgres.user,
        password: postgres.pwd,
        database: dbName,
        entities: [Menu, OrderItem, Order, Seat, Staff],
        synchronize: false,
      })
      await dataSource.initialize()

      this.connections.set(dbName, dataSource)
    }
    return this.connections.get(dbName)!
  }

  async withTransaction(name: string, fn: (q: EntityManager) => any) {
    const queryRunner = await this.createQr(name)
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result = await fn(queryRunner.manager)
      await queryRunner.commitTransaction()
      return result
    } catch (err: any) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
      if (err instanceof GqlValidationEx) {
        throw err
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release()
    }
  }

  /**
   * Need to destroy all connections to properly exit after running cli commands
   */
  async onModuleDestroy() {
    for (const [name, dataSource] of this.connections) {
      if (dataSource.isInitialized) await dataSource.destroy()
    }
  }
}

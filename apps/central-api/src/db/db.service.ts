import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataSource, EntityManager, QueryRunner } from 'typeorm'
import { Menu } from './entities'

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private dataSource: DataSource
  private connections = new Map<string, DataSource>()
  public em: EntityManager

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.switchDb()
  }

  async onModuleDestroy() {
    for (const [name, dataSource] of this.connections) {
      if (dataSource.isInitialized) await dataSource.destroy()
    }
  }

  createQueryRunner() {
    return this.dataSource.createQueryRunner()
  }

  async switchDb(name?: string) {
    const postgres = this.configService.get('database.postgres')

    const dbName: string = name || postgres.name
    const existingConnection = this.connections.get(dbName)

    if (existingConnection) {
      this.dataSource = existingConnection
      // if (!existingConnection.isInitialized) await existingConnection.initialize()
    } else {
      const dataSource = new DataSource({
        type: 'postgres',
        host: postgres.host,
        port: postgres.port,
        username: postgres.user,
        password: postgres.pwd,
        database: dbName,
        synchronize: false,
        entities: [Menu],
      })
      await dataSource.initialize()

      this.connections.set(dbName, dataSource)
      this.dataSource = dataSource
      this.em = dataSource.createEntityManager()
    }
  }

  // should not run this.switchDb inside since postgres does not support multi db transaction
  async withTransaction(fn: (q: QueryRunner) => any) {
    const queryRunner = this.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result = await fn(queryRunner)
      await queryRunner.commitTransaction()
      return result
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
  }
}

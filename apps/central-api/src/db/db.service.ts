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
    this.switchDb()

    if (!this.dataSource.isInitialized) await this.dataSource.initialize()

    this.em = this.dataSource.createEntityManager()
  }

  async onModuleDestroy() {
    // console.log(await this.dataSource.query('SELECT current_database();'))
    // return this.dataSource.createEntityManager()
    for (const [name, dataSource] of this.connections) {
      if (dataSource.isInitialized) await dataSource.destroy()
    }
    console.log('>>>> Db service destroyed')
  }

  createQueryRunner() {
    return this.dataSource.createQueryRunner()
  }

  switchDb(name?: string) {
    const postgres = this.configService.get('database.postgres')

    const dbName: string = name || postgres.name
    const existingConnection = this.connections.get(dbName)

    if (existingConnection) {
      this.dataSource = existingConnection
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
      this.connections.set(dbName, dataSource)
      this.dataSource = dataSource
    }
  }
}

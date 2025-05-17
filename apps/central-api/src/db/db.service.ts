import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'

type MyDrizzle = ReturnType<typeof drizzle>

@Injectable()
export class DbService {
  private connectionPools: Map<string, MyDrizzle> = new Map()

  constructor(private configService: ConfigService) {}

  db(name?: string) {
    const postgres = this.configService.get('database.postgres')

    const dbName: string = name || postgres.name
    const existingConnection = this.connectionPools.get(dbName)

    if (!existingConnection) {
      const pool: MyDrizzle = drizzle({
        connection: {
          host: postgres.host,
          port: postgres.port,
          user: postgres.user,
          password: postgres.pwd,
          database: dbName,
        },
      })

      this.connectionPools.set(dbName, pool)
    }
    return this.connectionPools.get(dbName)!
  }
}

import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'
import { DataSource } from 'typeorm'

dotenv.config({ path: join(cwd() + '/.env.test') })

const main = async () => {
  const getDb = async (dbName?: string) => {
    const getEnv = (name: string) => process.env[name]
    const postgres = {
      host: getEnv('DB_POSTGRES_HOST'),
      user: getEnv('DB_POSTGRES_USER'),
      pwd: getEnv('DB_POSTGRES_PWD'),
      name: getEnv('DB_POSTGRES_DEFAULT_DB'),
      port: +getEnv('DB_POSTGRES_PORT')!,
    }
    const dataSource = new DataSource({
      type: 'postgres',
      host: postgres.host,
      port: postgres.port,
      username: postgres.user,
      password: postgres.pwd,
      database: dbName || 'postgres',
      // entities: [Menu, OrderItem, Order, Seat, Staff],
      synchronize: false,
    })
    await dataSource.initialize()
    return dataSource
  }

  const merchantSql = readFileSync(join(cwd(), '/src/db/sql/merchant-schema.sql'), 'utf-8')

  const postgresDb = await getDb('postgres')
  const qr = postgresDb.createQueryRunner()

  const createDb = async (dbName: string) => {
    await qr.query(`DROP DATABASE IF EXISTS ${dbName}`)
    await qr.query(`CREATE DATABASE ${dbName}`)
  }

  await createDb('test_merchant')
  const merchantDb = await getDb('test_merchant')
  const merchantQr = merchantDb.createQueryRunner()
  await merchantQr.query(merchantSql)

  await postgresDb.destroy()
  await merchantDb.destroy()
}

export default main

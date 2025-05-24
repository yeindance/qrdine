import { Staff } from '../src/db/entities'
import { TestApp } from '../src/graphql/tests/utils.spec'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'
import { DataSource } from 'typeorm'

dotenv.config({ path: join(cwd() + '/.env.test') })

const getEnv = (name: string) => process.env[name]

const testDb = getEnv('DB_POSTGRES_TEST_DB')!

const getDb = async (dbName?: string) => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: getEnv('DB_POSTGRES_HOST'),
    username: getEnv('DB_POSTGRES_USER'),
    password: getEnv('DB_POSTGRES_PWD'),
    port: +getEnv('DB_POSTGRES_PORT')!,
    database: dbName,
    // database: getEnv('DB_POSTGRES_DEFAULT_DB'),
    // entities: [Menu, OrderItem, Order, Seat, Staff],
    entities: [Staff],
    synchronize: false,
  })
  await dataSource.initialize()
  return dataSource
}

const main = async () => {
  const merchantSql = readFileSync(join(cwd(), '/src/db/sql/merchant-schema.sql'), 'utf-8')

  const postgresDb = await getDb('postgres')
  const qr = postgresDb.createQueryRunner()

  const createDb = async (dbName: string) => {
    await qr.query(`DROP DATABASE IF EXISTS ${dbName}`)
    await qr.query(`CREATE DATABASE ${dbName}`)
  }

  await createDb(testDb)
  const merchantDb = await getDb(testDb)
  const merchantQr = merchantDb.createQueryRunner()
  await merchantQr.query(merchantSql)

  const em = merchantDb.createEntityManager()
  const staff = await em.save(Staff, { name: 'Manager' })
  TestApp.staffId = staff.id

  await postgresDb.destroy()
  await merchantDb.destroy()
}

export default main

import { DbService } from '@db/db.service'
import { readFileSync } from 'fs'
import { Command, CommandRunner, Option } from 'nest-commander'
import { join } from 'path'
import { cwd } from 'process'

interface CommandOptions {
  force?: boolean
}

@Command({ name: 'dev-setup', description: 'Setup databases for development' })
export class DevSetupCmd extends CommandRunner {
  constructor(private dbService: DbService) {
    super()
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    try {
      const centralSql = readFileSync(join(cwd(), '/src/db/sql/hub-schema.sql'), 'utf-8')
      const merchantSql = readFileSync(join(cwd(), '/src/db/sql/merchant-schema.sql'), 'utf-8')

      const qr = await this.dbService.createQr('postgres')
      const createDb = async (dbName: string) => {
        if (options?.force) await qr.query(`DROP DATABASE IF EXISTS ${dbName}`)
        await qr.query(`CREATE DATABASE ${dbName}`)
      }

      // create meta db
      await createDb('hub')
      const centralDb = await this.dbService.createQr('hub')
      await centralDb.query(centralSql)

      // create a sample merchant db
      await createDb('kokofu')
      const merchantDb = await this.dbService.createQr('kokofu')
      await merchantDb.query(merchantSql)
      console.log('<--------- Dev setup completed 🥳 -------->')
      return
    } catch (err) {
      console.error(err)
    }
  }

  @Option({
    flags: '--force [boolean]',
    description: 'Drop if db already exists',
  })
  parseForce(val: string): boolean {
    return JSON.parse(val)
  }
}

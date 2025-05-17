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

      const db = this.dbService.db()
      const createDb = async (dbName: string) => {
        if (options?.force) await db.execute(`DROP DATABASE IF EXISTS ${dbName}`)
        await db.execute(`CREATE DATABASE ${dbName}`)
      }

      // create meta db
      await createDb('hub')
      const centralDb = this.dbService.db('hub')
      await centralDb.execute(centralSql)

      // create a sample merchant db
      await createDb('kokofu')
      const merchantDb = this.dbService.db('kokofu')
      await merchantDb.execute(merchantSql)
      console.log('<--------- Dev setup completed 🥳 -------->')
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

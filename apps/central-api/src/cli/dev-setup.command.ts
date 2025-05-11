import { DbService } from '@db/db.service'
import { Command, CommandRunner, Option } from 'nest-commander'
import { readFileSync } from 'fs'
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
      const centralSql = readFileSync(join(cwd(), '/src/db/sql/central-schema.sql'), 'utf-8')
      const merchantSql = readFileSync(join(cwd(), '/src/db/sql/merchant-schema.sql'), 'utf-8')

      const q = this.dbService.createQueryRunner()
      const createDb = async (dbName: string) => {
        if (options?.force) await q.query(`DROP DATABASE IF EXISTS ${dbName}`)
        await q.query(`CREATE DATABASE ${dbName}`)
      }

      // create meta db
      await createDb('hub')
      await this.dbService.switchDb('hub')
      const centralQ = this.dbService.createQueryRunner()
      await centralQ.query(centralSql)

      // create a sample merchant db
      await createDb('kokofu')
      await this.dbService.switchDb('kokofu')
      const merchantQ = this.dbService.createQueryRunner()
      await merchantQ.query(merchantSql)
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
    console.log({ val })
    return JSON.parse(val)
  }
}

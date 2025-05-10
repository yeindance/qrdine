import { Injectable } from '@nestjs/common'
import { Menu } from './db/entities/MenuEntity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { join } from 'path'
import { readFileSync } from 'fs'

@Injectable()
export class AppService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
  ) {}

  async getHello(): Promise<string> {
    const em = this.dataSource.createEntityManager()

    // Path to your .sql file
    const sqlFilePath = join(__dirname, '../src/db/merchant-schema.sql')

    // Read the SQL file contents
    const sql = readFileSync(sqlFilePath, 'utf-8')

    // Run the SQL query with EntityManager
    // await em.query(sql)
    // const menu = new Menu()
    // menu.name = 'hi'
    // await menu.save()
    // console.log(menu)

    // console.log(await this.menuRepo.find())
    return 'Hello World!'
  }
}

import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { DbModule } from '@db/db.module'
import { MyGraphQLModule } from '@graphql/graphql.module'
import { MyConfigModule } from './config/config.module'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [MyConfigModule, DbModule, MyGraphQLModule],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const port = configService.get('app.port') as string

  await app.listen(port)
}
void bootstrap()
//  const em = this.dataSource.createEntityManager()

//   // Path to your .sql file
//   const sqlFilePath = join(__dirname, '../src/db/merchant-schema.sql')

//   // Read the SQL file contents
//   const sql = readFileSync(sqlFilePath, 'utf-8')

//   // Run the SQL query with EntityManager
//   // await em.query(sql)

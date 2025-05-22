import { DbModule } from '@db/db.module'
import { MyGraphQLModule } from '@graphql/graphql.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MyConfigModule } from './config/config.module'

@Module({
  imports: [MyConfigModule.forRoot({ envPath: '.env' }), DbModule, MyGraphQLModule],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const port = configService.get('app.port') as string

  await app.listen(port)
}
void bootstrap()

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from '@db/entities/MenuEntity'
import { MyGraphQLModule } from '@graphql/graphql.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

const postgresConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'kokofu',
  synchronize: false,
  retryAttempts: 5,
  entities: [Menu],
})

@Module({
  imports: [postgresConfig, TypeOrmModule.forFeature([Menu]), MyGraphQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

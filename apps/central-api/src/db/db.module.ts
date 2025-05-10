import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './entities'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const postgres = configService.get('database.postgres')
        return {
          type: 'postgres',
          host: postgres.host,
          port: postgres.port,
          username: postgres.user,
          password: postgres.pwd,
          database: postgres.name,
          synchronize: false,
          retryAttempts: 5,
          entities: [Menu],
        }
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}

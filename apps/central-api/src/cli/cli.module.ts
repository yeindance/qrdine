import { MyConfigModule } from '@config/config.module'
import { DbModule } from '@db/db.module'
import { Module } from '@nestjs/common'
import { DevSetupCmd } from './dev-setup.command'

@Module({
  imports: [
    // override host to allow running commands in host machine
    MyConfigModule.forRoot({ overrides: { database: { postgres: { host: 'localhost', database: 'postgres' } } } }),
    DbModule,
  ],
  providers: [DevSetupCmd],
})
export class CliModule {}

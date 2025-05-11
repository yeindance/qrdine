import { Global, Module } from '@nestjs/common'
// import { Menu } from './entities'
import { DbService } from './db.service'

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}

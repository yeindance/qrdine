import { MyConfigModule } from '../../config/config.module'
import { DbModule } from '../../db/db.module'
import { MyGraphQLModule } from '../graphql.module'
import { Test } from '@nestjs/testing'

export class TestApp {
  static db = 'test_merchant'
  static staffId: string

  static async create() {
    const moduleRef = await Test.createTestingModule({
      imports: [MyConfigModule.forRoot({ envPath: '.env.test' }), DbModule, MyGraphQLModule],
    }).compile()
    const app = moduleRef.createNestApplication()
    await app.init()
    return app
  }
}

import { MyConfigModule } from '@config/config.module'
import { DbModule } from '@db/db.module'
import { MyGraphQLModule } from '@graphql/graphql.module'
import { MenuMutationResolver } from '@graphql/mutation/MenuMutation'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
// import { TestApp } from './utils.spec'

describe('MenuMutationTest', () => {
  class TestApp {
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

  let app: INestApplication
  const db = TestApp.db
  let mutation: MenuMutationResolver

  beforeAll(async () => {
    app = await TestApp.create()
    mutation = app.get(MenuMutationResolver)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Create menu', () => {
    it('should create and return', async () => {
      const values = { name: 'Cabbage', price: 350.4 }
      const menu = await mutation.resolve({ values }, { merchantId: db, staffId: '' })
      expect(menu).toMatchObject(values)
    })
  })

  describe('Update an existing menu', () => {
    it('Should update and return', async () => {
      const values = { name: 'Cabbage', price: 350.4 }
      await mutation.resolve({ values }, { merchantId: db, staffId: '' })
      const updatedValues = { name: 'Cabbage Raw', price: 400 }
      const updatedMenu = await mutation.resolve({ values: updatedValues }, { merchantId: db, staffId: '' })
      expect(updatedMenu).toMatchObject(updatedValues)
    })
  })
})

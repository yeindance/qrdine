import { MyConfigModule } from '@config/config.module'
import { DbModule } from '@db/db.module'
import { MyGraphQLModule } from '@graphql/graphql.module'
import { MenuMutationResolver } from '@graphql/mutation/MenuMutation'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('MenuMutationTest', () => {
  let moduleRef: TestingModule
  let mutation: MenuMutationResolver
  let app: INestApplication
  const db = 'test_merchant'

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [MyConfigModule.forRoot({ envPath: '.env.test' }), DbModule, MyGraphQLModule],
    }).compile()
    app = moduleRef.createNestApplication()
    await app.init()

    mutation = moduleRef.get(MenuMutationResolver)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Create menu', () => {
    it('should create and return', async () => {
      const values = { name: 'Cabbage', price: 350.4 }
      const menu = await mutation.resolve({ values }, { merchantId: db })
      expect(menu).toMatchObject(values)
    })
  })

  describe('Update an existing menu', () => {
    it('Should update and return', async () => {
      const values = { name: 'Cabbage', price: 350.4 }
      await mutation.resolve({ values }, { merchantId: db })
      const updatedValues = { name: 'Cabbage Raw', price: 400 }
      const updatedMenu = await mutation.resolve({ values: updatedValues }, { merchantId: db })
      expect(updatedMenu).toMatchObject(updatedValues)
    })
  })
})

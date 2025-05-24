import { OrderMutationResolver } from '@graphql/mutation/OrderMutation'
import { INestApplication } from '@nestjs/common'
import { TestApp } from './utils.spec'

describe('OrderMutationTest', () => {
  let app: INestApplication
  const db = TestApp.db
  let mutation: OrderMutationResolver

  beforeAll(async () => {
    app = await TestApp.create()
    mutation = app.get(OrderMutationResolver)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Create order', () => {
    it('should create and return', async () => {
      // const values = { name: 'Cabbage' }
      // const order = await mutation.resolve({ values }, { merchantId: db, staffId: '' })
      // console.debug('staffId', TestApp.staffId)
      // expect(order).toMatchObject(values)
    })
  })

  // describe('Update an existing order', () => {
  //   it('Should update and return', async () => {
  //     const values = { name: 'Cabbage', price: 350.4 }
  //     await mutation.resolve({ values }, { merchantId: db })
  //     const updatedValues = { name: 'Cabbage Raw', price: 400 }
  //     const updatedOrder = await mutation.resolve({ values: updatedValues }, { merchantId: db })
  //     expect(updatedOrder).toMatchObject(updatedValues)
  //   })
  // })
})

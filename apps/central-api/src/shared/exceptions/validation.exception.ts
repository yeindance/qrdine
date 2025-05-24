import { GraphQLError } from 'graphql'

export class GqlValidationEx extends GraphQLError {
  constructor(msg: string, errors: any) {
    super('Validation Error', {
      extensions: {
        code: 'BAD_INPUT',
        statusCode: 400,
        errors,
        timestamp: new Date().toISOString(),
      },
    })

    // super(msg, {
    //   extensions: {
    //     code: 'Validation Error',
    //     statusCode: 400,
    //     errors: { me: 'I am' },
    //   },
    // })
  }
}

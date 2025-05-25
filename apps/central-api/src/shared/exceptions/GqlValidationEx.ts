import { GraphQLError } from 'graphql'

export class GqlValidationEx extends GraphQLError {
  constructor(errors: any) {
    super('Validation Error', {
      extensions: {
        code: 'BAD_INPUT',
        statusCode: 400,
        errors,
        // timestamp: new Date().toISOString(),
      },
    })
  }
}

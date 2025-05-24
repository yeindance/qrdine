import { Injectable } from '@nestjs/common'
import { GqlValidationEx } from '@shared/exceptions'
import { z } from 'zod/v4'

export class ValidationHelper {
  static validate<T>(object: any, schema: z.ZodType): T {
    const result = schema.safeParse(object)
    if (result.error) {
      throw new GqlValidationEx(z.prettifyError(result.error), result.error.issues)
    }
    return result as T
  }
}

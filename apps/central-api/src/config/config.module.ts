import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as _ from 'lodash'
import { cwd } from 'process'

import { z } from 'zod'

const centralConfig = () => ({
  app: {
    port: getEnv('CENTRAL_API_PORT'),
  },
  database: {
    postgres: {
      host: getEnv('CENTRAL_API_DB_POSTGRES_HOST'),
      user: getEnv('CENTRAL_API_DB_POSTGRES_USER'),
      pwd: getEnv('CENTRAL_API_DB_POSTGRES_PWD'),
      name: getEnv('CENTRAL_API_DB_POSTGRES_NAME'),
      port: getEnv('CENTRAL_API_DB_POSTGRES_PORT'),
    },
  },
})

const getEnv = (name: string) => process.env[name]

interface IMyConfigModuleOptions {
  overrides?: any
}

@Module({})
export class MyConfigModule {
  static forRoot(options: IMyConfigModuleOptions): DynamicModule {
    return {
      module: MyConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => _.merge({}, centralConfig(), options.overrides || {})],
        }),
      ],
    }
  }
}

// export const configSchema = z.object({
//   app: z.object({ port: z.string() }),
//   database: z.object({
//     postgres: z.object({
//       host: z.string(),
//       user: z.string(),
//       pwd: z.string(),
//       name: z.string(),
//       port: z.string(),
//     }),
//   }),
// })

// export type MyConfig = z.infer<typeof configSchema>

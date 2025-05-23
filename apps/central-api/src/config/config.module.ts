import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as _ from 'lodash'

const centralConfig = () => ({
  app: {
    port: getEnv('API_PORT'),
  },
  database: {
    postgres: {
      host: getEnv('DB_POSTGRES_HOST'),
      user: getEnv('DB_POSTGRES_USER'),
      pwd: getEnv('DB_POSTGRES_PWD'),
      name: getEnv('DB_POSTGRES_DEFAULT_DB'),
      port: getEnv('DB_POSTGRES_PORT'),
    },
  },
})

const getEnv = (name: string) => process.env[name]

interface IMyConfigModuleOptions {
  overrides?: any
  envPath?: string
}

@Module({})
export class MyConfigModule {
  static forRoot(options: IMyConfigModuleOptions): DynamicModule {
    return {
      module: MyConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: options.envPath || '.env',
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

import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { z } from 'zod'

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

// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [centralConfig],
      // validate: () => {
      //   const parsed = configSchema.safeParse(centralConfig())
      //   if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format()))
      //   return parsed.data
      // },
    }),
  ],
})
export class MyConfigModule {}

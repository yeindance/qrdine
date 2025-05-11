import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

import { MenuMutationResolver } from './mutation/MenuMutation'
import { MenuListQueryResolver } from './query/MenuListQuery'
import { DbService } from '@db/db.service'

@Global()
@Module({
  providers: [MenuListQueryResolver, MenuMutationResolver],
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [DbService],
      useFactory(dbService: DbService) {
        return {
          playground: false,
          autoSchemaFile: true,
          resolvers: { JSON: GraphQLJSON },
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          debug: true,
          context: async () => {
            // TODO: dynamic switching based on req
            await dbService.switchDb('kokofu')
          },
        }
      },
    }),
  ],
})
export class MyGraphQLModule {}

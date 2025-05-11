import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

import { MenuMutationResolver } from './mutation/MenuMutation'
import { MenuListQueryResolver } from './query/MenuListQuery'

@Global()
@Module({
  providers: [MenuListQueryResolver, MenuMutationResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      debug: true,
    }),
  ],
})
export class MyGraphQLModule {}

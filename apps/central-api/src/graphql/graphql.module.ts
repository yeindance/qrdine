import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

import { MenuMutationResolver } from './mutation/MenuMutation'
import { MenuListQueryResolver } from './query/MenuListQuery'
import { SeatMutationResolver } from './mutation/SeatMutation'
import { StaffMutationResolver } from './mutation/StaffMutation'
import { SeatListQueryResolver } from './query/SeatListQuery'
import { StaffListQueryResolver } from './query/StaffListQuery'

export interface MyGraphQlContext {
  merchantId: string
}

@Global()
@Module({
  providers: [
    MenuListQueryResolver,
    MenuMutationResolver,
    SeatListQueryResolver,
    SeatMutationResolver,
    StaffListQueryResolver,
    StaffMutationResolver,
  ],
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory() {
        return {
          playground: false,
          autoSchemaFile: true,
          resolvers: { JSON: GraphQLJSON },
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          debug: true,
          context: (): MyGraphQlContext => {
            // TODO: retrieve merchantId from req
            return {
              merchantId: 'kokofu',
            }
          },
        }
      },
    }),
  ],
})
export class MyGraphQLModule {}

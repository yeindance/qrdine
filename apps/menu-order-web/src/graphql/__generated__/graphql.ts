/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type MenuType = {
  __typename?: 'MenuType';
  available: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  MenuMutation: MenuType;
  OrderMutation: OrderType;
  SeatMutation: SeatType;
  StaffMutation: StaffType;
};


export type MutationMenuMutationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['JSON']['input'];
};


export type MutationOrderMutationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['JSON']['input'];
};


export type MutationSeatMutationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['JSON']['input'];
};


export type MutationStaffMutationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  values: Scalars['JSON']['input'];
};

export type OrderItemType = {
  __typename?: 'OrderItemType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  menuId: Scalars['String']['output'];
  menuPrice: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  quantity: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderType = {
  __typename?: 'OrderType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orderItems: Array<OrderItemType>;
  paid?: Maybe<Scalars['String']['output']>;
  seatId: Scalars['String']['output'];
  staffId: Scalars['String']['output'];
  total?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  MenuList: Array<MenuType>;
  OrderList: Array<OrderType>;
  SeatList: Array<SeatType>;
  StaffList: Array<StaffType>;
};


export type QueryMenuListArgs = {
  where: Scalars['JSON']['input'];
};


export type QueryOrderListArgs = {
  where: Scalars['JSON']['input'];
};


export type QuerySeatListArgs = {
  where: Scalars['JSON']['input'];
};


export type QueryStaffListArgs = {
  where: Scalars['JSON']['input'];
};

export type SeatType = {
  __typename?: 'SeatType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StaffType = {
  __typename?: 'StaffType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QueryQueryVariables = Exact<{
  where: Scalars['JSON']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', MenuList: Array<{ __typename?: 'MenuType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, price: string }> };


export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MenuList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
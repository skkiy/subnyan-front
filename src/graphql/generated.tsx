import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Cursor: any
  Time: any
}

export type Backward = {
  before?: Maybe<Scalars["Cursor"]>
  last: Scalars["Int"]
}

export type Connection = {
  edges: Array<Edge>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type CreateUser = {
  email: Scalars["String"]
  name: Scalars["String"]
}

export type DeleteSubscription = {
  id: Scalars["ID"]
}

export type Edge = {
  cursor: Scalars["Cursor"]
  node?: Maybe<Node>
}

export type EdgeOrder = {
  direction: OrderDirection
  key: OrderKey
}

export type Forward = {
  after?: Maybe<Scalars["Cursor"]>
  first: Scalars["Int"]
}

export type Hello = {
  __typename?: "Hello"
  message: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createSubscription: SubscriptionNode
  createUser: User
  deleteSubscription: Node
  deleteUser: Node
  updateSubscription: SubscriptionNode
  updateUser: User
}

export type MutationCreateSubscriptionArgs = {
  input: NewSubscription
}

export type MutationCreateUserArgs = {
  input: CreateUser
}

export type MutationDeleteSubscriptionArgs = {
  input: DeleteSubscription
}

export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscription
}

export type MutationUpdateUserArgs = {
  input: UpdateUser
}

export type NewSubscription = {
  cancelPageLink: Scalars["String"]
  description: Scalars["String"]
  name: Scalars["String"]
  paymentDate: Scalars["Time"]
  paymentInterval: PaymentIntervalStatus
  price: Scalars["Int"]
}

export type Node = {
  id: Scalars["ID"]
}

export type OrderDirection = "ASC" | "DESC"

export type OrderKey = {
  subscription?: Maybe<SubscriptionOrderKey>
}

export type PageCondition = {
  backward?: Maybe<Backward>
  forward?: Maybe<Forward>
  limit?: Maybe<Scalars["Int"]>
  pageNumber: Scalars["Int"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor: Scalars["Cursor"]
  hasNextPage: Scalars["Boolean"]
  hasPreviousPage: Scalars["Boolean"]
  startCursor: Scalars["Cursor"]
}

export type PaymentIntervalStatus = "ONE_MONTH" | "SIX_MONTH" | "THREE_MONTH" | "TWELVE_MONTH"

export type Query = {
  __typename?: "Query"
  hello: Hello
  me: User
  subscription: SubscriptionNode
  subscriptions: SubscriptionConnection
}

export type QueryHelloArgs = {
  name: Scalars["String"]
}

export type QuerySubscriptionArgs = {
  id: Scalars["String"]
}

export type QuerySubscriptionsArgs = {
  edgeOrder: EdgeOrder
  filterCondition: SubscriptionFilterCondition
  pageCondition?: Maybe<PageCondition>
}

export type Role = "ADMIN" | "OWNER" | "USER"

export type SubscriptionConnection = Connection & {
  __typename?: "SubscriptionConnection"
  edges: Array<SubscriptionEdge>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type SubscriptionEdge = Edge & {
  __typename?: "SubscriptionEdge"
  cursor: Scalars["Cursor"]
  node?: Maybe<SubscriptionNode>
}

export type SubscriptionFilterCondition = {
  disabled?: Maybe<Scalars["Boolean"]>
  userId: Scalars["String"]
}

export type SubscriptionNode = Node & {
  __typename?: "SubscriptionNode"
  cancelPageLink: Scalars["String"]
  createdAt: Scalars["Time"]
  description: Scalars["String"]
  disabled: Scalars["Boolean"]
  id: Scalars["ID"]
  name: Scalars["String"]
  paymentDate: Scalars["Time"]
  paymentInterval: PaymentIntervalStatus
  price: Scalars["Int"]
  updatedAt: Scalars["Time"]
}

export type SubscriptionOrderKey =
  | "CREATED_AT"
  | "NAME"
  | "PAYMENT_DATE"
  | "PAYMENT_INTERVAL"
  | "price"

export type UpdateSubscription = {
  cancellPageLink: Scalars["String"]
  description: Scalars["String"]
  disabled?: Maybe<Scalars["Boolean"]>
  id: Scalars["ID"]
  name: Scalars["String"]
  paymentDate: Scalars["Time"]
  paymentInterval: PaymentIntervalStatus
  price: Scalars["Int"]
}

export type UpdateUser = {
  name: Scalars["String"]
}

export type User = Node & {
  __typename?: "User"
  email: Scalars["String"]
  id: Scalars["ID"]
  name: Scalars["String"]
}

export type HelloUserQueryVariables = Exact<{
  name: Scalars["String"]
  userId: Scalars["String"]
}>

export type HelloUserQuery = {
  __typename?: "Query"
  hello: { __typename?: "Hello"; message: string }
  me: { __typename?: "User"; id: string; name: string; email: string }
  subscriptions: {
    __typename?: "SubscriptionConnection"
    totalCount: number
    pageInfo: {
      __typename?: "PageInfo"
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: any
      endCursor: any
    }
    edges: Array<{
      __typename?: "SubscriptionEdge"
      cursor: any
      node?: Maybe<{
        __typename?: "SubscriptionNode"
        id: string
        name: string
        price: number
        disabled: boolean
      }>
    }>
  }
}

export const HelloUserDocument = gql`
  query HelloUser($name: String!, $userId: String!) {
    hello(name: $name) {
      message
    }
    me {
      id
      name
      email
    }
    subscriptions(
      filterCondition: { userId: $userId }
      edgeOrder: { key: { subscription: NAME }, direction: ASC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          price
          disabled
        }
      }
    }
  }
`

/**
 * __useHelloUserQuery__
 *
 * To run a query within a React component, call `useHelloUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHelloUserQuery(
  baseOptions: Apollo.QueryHookOptions<HelloUserQuery, HelloUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<HelloUserQuery, HelloUserQueryVariables>(HelloUserDocument, options)
}
export function useHelloUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloUserQuery, HelloUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<HelloUserQuery, HelloUserQueryVariables>(HelloUserDocument, options)
}
export type HelloUserQueryHookResult = ReturnType<typeof useHelloUserQuery>
export type HelloUserLazyQueryHookResult = ReturnType<typeof useHelloUserLazyQuery>
export type HelloUserQueryResult = Apollo.QueryResult<HelloUserQuery, HelloUserQueryVariables>

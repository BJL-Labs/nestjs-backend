import {
  Field,
  HideField,
  ObjectType,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { PageInfo } from './page-info'
import { Type } from '@nestjs/common'

export default function Paginated<TItem>(TItemClass: Type<TItem>): any {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field((type) => [TItemClass], { nullable: true })
    docs: Array<TItem>

    @Field((type) => Int)
    totalDocs?: number

    @Field((type) => Int)
    limit?: number
    @Field((type) => Int)
    totalPages?: number
    @Field((type) => Int)
    page?: number
    @Field((type) => Int)
    pagingCounter?: number
    @Field((type) => Boolean)
    hasPrevPage?: boolean
    @Field((type) => Boolean)
    hasNextPage?: boolean
    @Field((type) => Int, { nullable: true })
    prevPage?: number
    @Field((type) => Int, { nullable: true })
    nextPage?: number
    @Field((type) => Boolean)
    hasMore: boolean

    pageInfo: PageInfo
  }

  return PaginatedType
}

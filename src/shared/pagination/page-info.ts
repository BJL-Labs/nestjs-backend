import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
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
  @Field((type) => Int)
  prevPage?: number
  @Field((type) => Int)
  nextPage?: number
  @Field((type) => Boolean)
  hasMore: boolean
}

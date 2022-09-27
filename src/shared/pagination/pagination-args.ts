import { Field, ArgsType, Int, ID } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  page?: number

  @Field((type) => Int, { nullable: true })
  limit?: number

  @Field((type) => String, { nullable: true })
  sort?: string

  @Field((type) => Int, { nullable: true })
  offset?: number

  @Field((type) => Int, { nullable: true })
  maxTimeMS?: number
}

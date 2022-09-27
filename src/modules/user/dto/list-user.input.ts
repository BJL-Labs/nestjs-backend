import { Field, InputType } from "@nestjs/graphql"
import { Types } from "mongoose"

@InputType()
export class ListUsersInput {
  @Field((type) => String, { defaultValue: '' })
  readonly search?: string = ''
}

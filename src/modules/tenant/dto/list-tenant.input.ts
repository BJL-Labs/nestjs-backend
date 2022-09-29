import { Field, InputType } from "@nestjs/graphql"
import { Types } from "mongoose"

@InputType()
export class ListTenantInput {
  @Field((type) => String, { defaultValue: '' })
  readonly search?: string = ''
}

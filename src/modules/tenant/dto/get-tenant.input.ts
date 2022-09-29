import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetTenantInput {
  @Field((type) => String, { nullable: true })
  readonly _id?: string
}

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetUserInput {
  @Field((type) => String, { nullable: true })
  readonly _id?: string
}

import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  password: string

  @Field(() => String)
  confirmPassword: string
}


@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  picture?: string
}
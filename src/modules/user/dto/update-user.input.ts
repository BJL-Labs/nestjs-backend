import { Field, InputType } from "@nestjs/graphql"
import { Types } from "mongoose"
import { UserRole } from "../user.model"

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  password: string

  @Field(() => String)
  confirmPassword: string
}


@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  role?: UserRole

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  picture?: string
}
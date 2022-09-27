import { IsEmail, MinLength } from 'class-validator'
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field({ nullable: true })
  readonly username?: string

  @Field()
  @MinLength(6)
  readonly password: string
}

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  readonly token: string

  @Field(() => String)
  @MinLength(6)
  readonly password: string

  @Field(() => String)
  @MinLength(6)
  readonly confirmPassword: string
}

@InputType()
export class ForgotInput {
  @Field(() => String)
  readonly email: string
}

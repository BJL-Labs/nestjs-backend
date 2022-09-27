import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '@modules/user/user.model'

@ObjectType()
export class AuthResponse {
  @Field()
  token: string
  @Field()
  refreshToken: string
  @Field()
  user: User
}

@ObjectType()
export class TokenFeedBack {
  token: string
}

@ObjectType()
export class UserAccount {
  credentials: boolean
}

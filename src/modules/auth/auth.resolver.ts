import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { User } from '@modules/user/user.model'
import {
  GqlUser,
} from '@shared/decorators/decorators'
import { AuthResponse } from './auth.model'
import { GqlAuthGuard } from '@guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { LoginInput } from './dto/login.input'

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Mutation((type) => AuthResponse)
  async login(@Args('data') data: LoginInput) {
    const user = await this.authService.login(data)
    const token = this.jwt.sign(
      { id: user._id, name: user.name },
      { expiresIn: '1h' },
    )
    const refreshToken = this.jwt.sign(
      { id: user._id, name: user.name },
      { expiresIn: '3d' },
    )
    return {
      token,
      refreshToken,
      user,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((type) => AuthResponse)
  async refreshToken(@GqlUser() user: User) {
    const token = this.jwt.sign(
      { id: user._id, name: user.name },
      { expiresIn: '1h' },
    )
    const refreshToken = this.jwt.sign(
      { id: user._id, name: user.name },
      { expiresIn: '3d' },
    )
    return {
      token,
      refreshToken,
      user,
    }
  }
}

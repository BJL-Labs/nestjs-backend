import {
  ExecutionContext,
  Injectable,
  CanActivate,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { WsException } from '@nestjs/websockets'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@modules/user/user.repository'

@Injectable()
export class GqlSocketAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const data = context.switchToWs().getClient()
      const headers = data.handshake.headers
      const authToken = headers.token
      const tenant = headers.tenant

      const user: any = await this.jwtService.verifyAsync(authToken, {
        secret: process.env.JWT_SECRET,
      })

      if (!user) {
        throw new WsException('UNAUTHORIZED')
      }

      context.switchToWs().getData().bjl_user = user

      return true
    } catch (err) {
      console.log('socket exception', err)
      throw new WsException(err.message)
    }
  }
}

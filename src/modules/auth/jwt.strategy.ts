import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { AuthValidate } from './auth.validate'

const cookieExtractor = (req: Request): string | null => {
  let token = null
  if (req && req.headers) {
    token = req.headers.access_token || req.headers.authorization
  }

  return token
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authValidate: AuthValidate,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  validate(payload) {
    return this.authValidate.validate(payload)
  }
}

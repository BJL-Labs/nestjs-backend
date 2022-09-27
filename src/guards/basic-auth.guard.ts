import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') implements CanActivate {
  constructor(private reflector: Reflector) {
    super(reflector)
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)
    return true
  }
}

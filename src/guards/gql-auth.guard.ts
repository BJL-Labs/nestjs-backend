import {
  ExecutionContext,
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'
import { User } from '@modules/user/user.model'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {
    super(reflector)
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const ctx = GqlExecutionContext.create(context).getContext()
    const user: User = ctx.req.user
    if (!user) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }

    // const roles = this.reflector.get<string[]>('roles', context.getHandler())
    // if (
    //   roles?.length &&
    //   !roles.find((role) => userRoles.find((userRole) => userRole === role))
    // ) {
    //   throw new HttpException('NOT_PERMITTED', HttpStatus.FORBIDDEN)
    // }

    // const actions = this.reflector.get<string[]>(
    //   'actions',
    //   context.getHandler(),
    // )
    // if (
    //   actions?.length &&
    //   !actions.find((action) =>
    //     userActions.find((userAction) => userAction === action),
    //   )
    // ) {
    //   throw new HttpException('NOT_PERMITTED', HttpStatus.FORBIDDEN)
    // }

    return true
  }
}

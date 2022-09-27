import { User } from '@modules/user/user.model'
import { HttpException, HttpStatus } from '@nestjs/common'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

export const CustomFieldMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx
  const { extensions } = info.parentType.getFields()[info.fieldName]
  const context: any = ctx.context

  const user: User = context.req.user

  if (!extensions.roles || !extensions.actions) {
    return next()
  }

  // const { roles: userRoles, actions: userActions } = user.tenants.find((it) =>
  //   it.tenant.equals(context.req.headers.tenant),
  // )

  // throw new HttpException('NOT_PERMITTED', HttpStatus.FORBIDDEN)

  const baseArray: string[] = new Array<string>()

  // if (extensions.roles) {
  //   const roles: string[] = baseArray.concat(extensions.roles)
  //   if (
  //     roles?.length &&
  //     !roles.find((role) => userRoles.find((userRole) => userRole === role))
  //   ) {
  //     throw new HttpException(
  //       {
  //         message: 'FIELD_PERMISSION',
  //         description: `${info.fieldName}`,
  //       },
  //       HttpStatus.FORBIDDEN,
  //     )
  //   }
  // }

  // if (extensions.actions) {
  //   const actions: string[] = baseArray.concat(extensions.actions)
  //   if (
  //     actions?.length &&
  //     !actions.find((action) =>
  //       userActions.find((userAction) => userAction === action),
  //     )
  //   ) {
  //     throw new HttpException(
  //       {
  //         message: 'FIELD_PERMISSION',
  //         description: `${info.fieldName}`,
  //       },
  //       HttpStatus.FORBIDDEN,
  //     )
  //   }
  // }

  // console.log(value);
  return next()
}

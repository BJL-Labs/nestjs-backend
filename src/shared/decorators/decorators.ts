import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Response } from 'express'
import { User } from '@modules/user/user.model'
import { Types } from 'mongoose'

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
)

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context).getContext()
    return ctx.req && ctx.req.user
  },
)


export const SelectedTenant = createParamDecorator(
  (data: unknown, context: ExecutionContext): Types.ObjectId => {
    const ctx = GqlExecutionContext.create(context).getContext()
    return new Types.ObjectId(ctx.req.tenant._id)
  },
)

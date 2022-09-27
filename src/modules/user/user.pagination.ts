import { ObjectType } from '@nestjs/graphql'
import PaginatedResponse from '@shared/pagination/pagination.response'
import { User } from './user.model'

@ObjectType()
export class UserConnection extends PaginatedResponse(User) {}

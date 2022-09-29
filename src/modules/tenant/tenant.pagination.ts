import { ObjectType } from '@nestjs/graphql'
import PaginatedResponse from '@shared/pagination/pagination.response'
import { Tenant } from './tenant.model'

@ObjectType()
export class TenantConnection extends PaginatedResponse(Tenant) {}

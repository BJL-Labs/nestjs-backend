import { GqlAuthGuard } from '@guards/gql-auth.guard';
import { User } from '@modules/user/user.model';
import { UserRepository } from '@modules/user/user.repository';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PaginationArgs } from '@shared/pagination/pagination-args';
import { CreateTenantInput } from './dto/create-tenant.input';
import { GetTenantInput } from './dto/get-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { Tenant } from './tenant.model';
import { TenantConnection } from './tenant.pagination';
import { TenantRepository } from './tenant.repository';

@Resolver((of)=> Tenant)
export class TenantResolver {
    constructor(
        private tenantRepository: TenantRepository,
        private readonly userRepository: UserRepository,
    ){}

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Tenant)
    async createTenant(
        @Args('data') data: CreateTenantInput
    ): Promise<Tenant>{
        const tenant = await this.tenantRepository.create(data);
        return tenant;
    }
    
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Tenant)
    async removeTenant(
      @Args('id') id: string,
    ): Promise<Tenant> {
      const tenant = await this.tenantRepository.delete(id)
      return tenant
    }
  
    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => Tenant)
    async updateTenant(
      @Args('id') id: string,
      @Args('data') data: UpdateTenantInput,
    ): Promise<Tenant> {
      const Tenant = await this.tenantRepository.updateOne(id, {
        ...data,
      })
      return Tenant
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => TenantConnection)
    async listTenants(
        @Args() pagination: PaginationArgs,
    ): Promise<TenantConnection> {
        const q = {}
        const Tenants = await this.tenantRepository.list(q, pagination);
        return Tenants;
    }

    @UseGuards(GqlAuthGuard)
    @Query((returns) => Tenant)
    async getTenant(
      @Args('query') query: GetTenantInput,
    ): Promise<Tenant> {
      return await this.tenantRepository.findOne({
        _id: query._id,
      })
    }

    @ResolveField(() => [User])
    async users(@Parent() parent: Tenant): Promise<User[]> {
      return await this.userRepository.findByTenant({ tenant: parent._id })
    }
}

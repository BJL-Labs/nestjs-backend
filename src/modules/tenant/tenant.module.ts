
import { User, UserSchema } from '@modules/user/user.model';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Tenant, TenantSchema } from './tenant.model';
import { TenantRepository } from './tenant.repository';
import { TenantResolver } from './tenant.resolver';

const Repositories = [
  {
    model: Tenant,
    schema: TenantSchema,
    repository: TenantRepository,
    slug: 'tenant',
  },
  {
    model: User,
    schema: UserSchema,
    repository: UserRepository,
    slug: 'user',
  },
]

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      Repositories.map(({ model, schema, slug }) => ({
        name: model.name,
        useFactory: () => {
          schema.plugin(require('mongoose-paginate-v2'))
          return schema
        },
      })),
      'default',
    ),
  ],
  providers: [
    UserService,
    TenantResolver,
    ...Repositories.map((repo) => repo.repository),
  ],
  exports: [TenantRepository, UserService],
})
export class TenantModule {}

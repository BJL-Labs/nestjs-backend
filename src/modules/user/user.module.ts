import { Global, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';
import { Tenant, TenantSchema } from '@modules/tenant/tenant.model';
import { TenantRepository } from '@modules/tenant/tenant.repository';

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
    UserResolver,
    ...Repositories.map((repo) => repo.repository),
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}

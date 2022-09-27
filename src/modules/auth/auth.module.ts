import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthValidate } from './auth.validate'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@modules/user/user.model'
import { UserRepository } from '@modules/user/user.repository'
import { UserService } from '@modules/user/user.service'

const Repositories = [
  {
    model: User,
    schema: UserSchema,
    repository: UserRepository,
  },
]

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeatureAsync(
      Repositories.map(({ model, schema }) => ({
        name: model.name,
        useFactory: () => {
          schema.plugin(require('mongoose-paginate-v2'))
          return schema
        },
      })),
      'default',
    ),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthValidate,
    JwtStrategy,
    ...Repositories.map((rep) => rep.repository),
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

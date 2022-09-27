import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core'
import configuration from './config/configuration'
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from '@modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { AppResolver } from './app.resolver';
import { CustomFieldMiddleware } from '@shared/middlewares/field.middleware';
import { AuthModule } from '@modules/auth/auth.module';

mongoose.set('debug', true)


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot("mongodb+srv://bjlsolucoes:BJL2022@cluster0.rocnxsb.mongodb.net/?retryWrites=true&w=majority",{
      ignoreUndefined: true,
      connectionName: 'default',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res, request: req }),
      buildSchemaOptions: {
        fieldMiddleware: [CustomFieldMiddleware],
      },
      cors: {
        origin: true,
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [ 
    AppService,
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}

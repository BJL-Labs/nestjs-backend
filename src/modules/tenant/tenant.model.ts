import { Field, HideField, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { Model } from '@shared/model';

@ObjectType()
export class TenantAddress {
  @Prop()
  @Field(() => String, { nullable: true })
  zipCode?: string

  @Prop()
  @Field(() => String, { nullable: true })
  street?: string

  @Prop()
  @Field(() => String, { nullable: true })
  complement?: string

  @Prop()
  @Field(() => String, { nullable: true })
  number?: string

  @Prop()
  @Field(() => String, { nullable: true })
  city?: string

  @Prop()
  @Field(() => String, { nullable: true })
  state?: string
}

@Schema()
@ObjectType()
export class Tenant extends Model {
    @Prop()
    @Field(() => String)
    name: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    email?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    picture?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    socialReason?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    phone?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    mobilePhone?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    cpfCnpj?: string

    @Prop()
    @Field(() => TenantAddress, { nullable: true })
    address?: TenantAddress
  
    @Prop()
    @Field(() => String, { nullable: true })
    municipalInscription?: string
  
    @Prop()
    @Field(() => String, { nullable: true })
    stateInscription?: string
}

export type TenantDocument = Tenant & Document;
export const TenantSchema = SchemaFactory.createForClass(Tenant);
// UserSchema.plugin(mongoosePaginate)
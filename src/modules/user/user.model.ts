import { Field, HideField, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { Model } from '@shared/model';
import { Tenant } from "@modules/tenant/tenant.model";

@Schema()
@ObjectType()
export class User extends Model {
    @Prop({
        type: String,
        ref: 'tenants',
        required: true,
    })
    tenant: string

    @Prop({
        type: String,
        trim: true,
    })
    @Field({ nullable: true })
    name: string

    @Prop({
        type: String,
        index: true,
        trim: true,
    })
    @Field({ nullable: true })
    username: string

    @Prop({
        type: String,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
        trim: true,
        lowercase: true,
    })
    @Field({ nullable: true })
    email: string

    @Prop({
        type: String,
        minlength: 6,
      })
    @Field({ nullable: true })
    password: string
    
    @Prop({
        type: String,
    })
    @Field({ nullable: true })
    picture?: string

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.plugin(mongoosePaginate)
import { Field, HideField, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { Model } from '@shared/model';


export enum UserRole {
   admin = 'admin',
   moderator = 'moderator',
   manager = 'manager',
   operator = 'operator',
   supervisor = 'supervisor',
   cordenator = 'cordenator',
   finance = 'finance',
   legal = 'legal',
   humanResources = 'humanResources',
   backoffice = 'backoffice',
   medias = 'medias',
   monitor = 'monitor',
}


registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'User role type enum'
})

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

    @Prop({
        type: String,
        enum: [
            UserRole.admin,
            UserRole.moderator,
            UserRole.manager,
            UserRole.operator,
            UserRole.supervisor,
            UserRole.cordenator,
            UserRole.finance,
            UserRole.legal,
            UserRole.humanResources,
            UserRole.backoffice,
            UserRole.medias,
            UserRole.monitor,
        ],
        required: true,
    })
    @Field(() => String, { nullable: false })
    role: string

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.plugin(mongoosePaginate)
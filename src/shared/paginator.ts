import { Field, ObjectType, ID, Parent, ResolveField } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Document } from 'mongoose'

@Schema()
@ObjectType({ isAbstract: true })
export abstract class Model {
  @Prop()
  @Field((type) => ID)
  _id: MongooseSchema.Types.ObjectId

  @Prop()
  @Field((type) => Date)
  createdAt: Date

  @Prop()
  @Field((type) => Date)
  updatedAt: Date
}

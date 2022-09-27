import { Field, ObjectType, ID, Parent, ResolveField } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types, Schema as MongooseSchema } from 'mongoose'

@Schema()
@ObjectType({ isAbstract: true })
export abstract class Model {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  @Field((type) => ID)
  _id?: Types.ObjectId

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field((type) => Date)
  createdAt?: Date

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field((type) => Date)
  updatedAt?: Date
}

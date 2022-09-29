import { InputType , Field } from "@nestjs/graphql";
import { Types } from "mongoose";

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    tenant: string;

    @Field({ nullable: true })
    name: string;
    
    @Field({ nullable: true })
    username: string

    @Field({ nullable: true })
    email: string;

    @Field({})
    password: string

    @Field({ nullable: true })
    picture?: string
}
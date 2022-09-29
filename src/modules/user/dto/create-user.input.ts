import { InputType , Field } from "@nestjs/graphql";
import { Types } from "mongoose";
import { UserRole } from "../user.model";

@InputType()
export class CreateUserInput {

    @Field({ nullable: false })
    role: UserRole

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
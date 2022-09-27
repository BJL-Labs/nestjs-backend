import { InputType , Field } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
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
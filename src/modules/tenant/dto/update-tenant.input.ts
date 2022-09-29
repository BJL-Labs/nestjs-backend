import { InputType , Field } from "@nestjs/graphql";
import { TenantAddressInput } from "./create-tenant.input";


@InputType()
export class UpdateTenantInput {
    @Field({ nullable: true })
    name?: string;
    
    @Field({ nullable: true })
    email?: string;

    @Field({nullable: true})
    picture?: string

    @Field({ nullable: true })
    socialReason?: string

    @Field({ nullable: true })
    phone?: string

    @Field({ nullable: true })
    mobilePhone?: string

    @Field({ nullable: true })
    cpfCnpj?: string

    @Field({ nullable: true })
    address?: TenantAddressInput

    @Field({ nullable: true })
    municipalInscription?: string

    @Field({ nullable: true })
    stateInscription?: string
}
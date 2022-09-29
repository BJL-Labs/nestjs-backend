import { InputType , Field } from "@nestjs/graphql";


@InputType()
export class TenantAddressInput {
    @Field({ nullable: true })
    zipCode?: string

    @Field({ nullable: true })
    street?: string

    @Field({ nullable: true })
    complement?: string

    @Field({ nullable: true })
    number?: string

    @Field({ nullable: true })
    city?: string

    @Field({ nullable: true })
    state?: string
}


@InputType()
export class CreateTenantInput {
    @Field({ nullable: true })
    name: string;
    
    @Field({ nullable: true })
    email: string;

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
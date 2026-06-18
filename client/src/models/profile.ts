import { Role } from "./user"

export interface Profile {
    firstName: string,
    lastName: string,
    username: string,
    status: boolean,
    email: string,
    phoneNumber: string,
    roles?: Role[],
    addresses: Address[]

}

export interface Address {
    streetAddress: string
    country: string,
    city: string,
}
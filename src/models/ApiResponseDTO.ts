import { Contact } from "./ContactModel";

export interface ApiResponseDTO {
    status: number;
    message: string;
    contact?: Contact;
}

export interface findAllApiResponseDTO {
    status: number;
    contacts: Contact[];
}

export interface deleteApiResponseDTO {
    status: number;
}
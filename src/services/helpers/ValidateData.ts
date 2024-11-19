import { ContactRepository } from "../../repositories/ContactRepository";
import { ApiRequestDTO } from "../../models/ApiRequestDTO";

export class ValidateData {

    constructor(private repository: ContactRepository) {

    }

    validateIfContactExists(id: string): any {
        const existingContact = this.repository.findAllContacts().find(contact => contact.id === id);
        if (!existingContact) {
            return {
                status: 404,
                message: 'The requested contact does not exist.'
            }
        }
        return null;
    }

    validatePhoneAndName(data: ApiRequestDTO): any {
        if (!this.#validateFirstName(data.firstName)) {
            return {
                status: 404,
                message: 'The name provided is too small. Please review it and try again.'
            };
        }
        if (!this.#validatePhoneNumber(data.phoneNumber)) {
            return {
                status: 404,
                message: 'The phone number provided is not in the right format. Please review it and try again.'
            };
        }
        return null;
    }
    
    #validatePhoneNumber(phone: string): boolean {
        const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneRegex.test(phone);
    }

    #validateFirstName(firstName: string): boolean {
        if (firstName && firstName.length < 1) {
            return false;
        }
        return true;
    }
}
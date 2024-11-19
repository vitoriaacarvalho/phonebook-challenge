import { Contact } from "../models/ContactModel";
import { ContactRepository } from "../repositories/ContactRepository"
import { ApiResponseDTO, deleteApiResponseDTO, findAllApiResponseDTO } from "../models/ApiResponseDTO";
import { ApiRequestDTO } from "../models/ApiRequestDTO"
import { ValidateData } from "./helpers/ValidateData";

export class ContactService {
    constructor(private repository: ContactRepository, private validator: ValidateData) {

    }

    insertContact(data: ApiRequestDTO): ApiResponseDTO {
        const validationError = this.validator.validatePhoneAndName(data);
        if (validationError) {
            return validationError;
        }
        const newContact: Contact = this.repository.insertContact(data);
        return {
            status: 201,
            message: 'Contact successfully created.',
            contact: newContact,
        }
    }

    findAllContacts(): findAllApiResponseDTO {
        const contacts: Contact[] = this.repository.findAllContacts();
        return {
            status: 200,
            contacts: contacts,
        }
    }

    updateContact(id: string, data: ApiRequestDTO): ApiResponseDTO {
        const validateContactExistence = this.validator.validateIfContactExists(id);
        if (validateContactExistence) { return validateContactExistence }
        const validationError = this.validator.validatePhoneAndName(data);
        if (validationError) { return validationError }
       
        const updatedContact: Contact = this.repository.updateContact(id, data);
        return {
            status: 201,
            message: 'Contact successfully updated',
            contact: updatedContact,
        }
    }

    deleteContact(id: string): deleteApiResponseDTO{
        const validateContactExistence = this.validator.validateIfContactExists(id);
        if (validateContactExistence) { return validateContactExistence }
        const deleted: boolean = this.repository.deleteContact(id)
        if (deleted) {
            console.log("deletou");
            return {
                status: 200
            }
        }
        return {status: 501}
    }
}
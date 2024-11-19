import { Request, Response } from 'express';
import { ContactService } from '../services/ContactService';
import { ApiResponseDTO, deleteApiResponseDTO, findAllApiResponseDTO } from '../models/ApiResponseDTO';

export class ContactController {
    constructor(private service: ContactService) {

    }

    insertContact = (req: Request, res: Response) => {
        try{
            const insertContactResponse: ApiResponseDTO = this.service.insertContact(req.body);
            res.status(insertContactResponse.status).json(insertContactResponse);
        } catch (error) {
            res.status(500).json({message: 'An internal error happened while creating this new contact. Please try again later'});
        }
    }

    findAllContacts = (req: Request, res: Response) => {
        try{
            const findAllContactsResponse: findAllApiResponseDTO = this.service.findAllContacts();
            res.status(findAllContactsResponse.status).json({body: findAllContactsResponse.contacts});
        } catch (error) {
            res.status(500).json({message: 'An internal error happened while retrieving contact list. Please try again later'});
        }
    }

    updateContact = (req: Request, res: Response) => {
        try{
            const updateContactResponse: ApiResponseDTO = this.service.updateContact(req.params.id, req.body);
            res.status(updateContactResponse.status).json({message: updateContactResponse.message, body: updateContactResponse.contact});
        }catch (error) {
            res.status(500).json({message: 'An internal error happened while updating contact. Please try again later'});
        }
    }

    deleteContact = (req: Request, res: Response) => {
        try{
            const deleteContactResponse: deleteApiResponseDTO = this.service.deleteContact(req.params.id);
            res.status(deleteContactResponse.status).json({});    
        }catch (error) {
            res.status(500).json({});
        }
    }
}
import { Contact } from "../models/ContactModel";
import { v4 as uuidv4 } from 'uuid';

export class ContactRepository {
    private contacts: Contact[] = [];

    insertContact(contact: Omit<Contact, 'id'>): Contact {
        const newContact: Contact = {
            id: uuidv4(), 
            ...contact
        };
        this.contacts.push(newContact);
        return newContact;
    }

    findAllContacts(): Contact[] {
        return [...this.contacts];
    }
    
    updateContact(id: string, updatedContact: Partial<Contact>): Contact {
        const index = this.contacts.findIndex(contact => contact.id === id);
        this.contacts[index] = {...this.contacts[index], ...updatedContact}
        return this.contacts[index];
    }

    deleteContact(id: string): boolean {
        const initialLenght = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        return this.contacts.length < initialLenght;
    }

}
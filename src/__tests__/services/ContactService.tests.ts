import { ContactService } from '../../services/ContactService';
import { ContactRepository } from '../../repositories/ContactRepository';
import { ValidateData } from '../../services/helpers/ValidateData';

describe('ContactService', () => {
    let contactService: ContactService;
    let mockRepository: jest.Mocked<ContactRepository>;
    let mockValidator: jest.Mocked<ValidateData>;

    beforeEach(() => {
        mockRepository = {
            insertContact: jest.fn(),
            findAllContacts: jest.fn(),
            updateContact: jest.fn(),
            deleteContact: jest.fn()
        } as any;

        mockValidator = {
            validatePhoneAndName: jest.fn(),
            validateIfContactExists: jest.fn()
        } as any;

        contactService = new ContactService(mockRepository, mockValidator);
    });

    describe('insertContact', () => {
        it('should return validation error if data is invalid', () => {
            const invalidData = { firstName: 'Joe', lastName: 'Alwyn', phoneNumber: 'invalid' };
            const validationError = { status: 400, message: 'Invalid data' };

            mockValidator.validatePhoneAndName.mockReturnValue(validationError);

            const result = contactService.insertContact(invalidData);

            expect(result).toEqual(validationError);
            expect(mockRepository.insertContact).not.toHaveBeenCalled();
        });

        it('should create contact successfully when data is valid', () => {
            const validData = { firstName: 'Ross', lastName: 'Geller', phoneNumber: '1234567890' };
            const createdContact = { id: '1', ...validData };

            mockValidator.validatePhoneAndName.mockReturnValue(null);
            mockRepository.insertContact.mockReturnValue(createdContact);

            const result = contactService.insertContact(validData);

            expect(result).toEqual({
                status: 201,
                message: 'Contact successfully created.',
                contact: createdContact
            });
        });
    });

    describe('findAllContacts', () => {
        it('should return all contacts', () => {
            const contacts = [
                { id: '1', firstName: 'Maria', lastName: 'Grace', phoneNumber: '1234567890' },
                { id: '2', firstName: 'Taylor', lastName: 'Grace', phoneNumber: '1234567890' },
                { id: '3', firstName: 'Carol', lastName: 'Geller', phoneNumber: '0987654321' }
            ];
            mockRepository.findAllContacts.mockReturnValue(contacts);

            const result = contactService.findAllContacts();

            expect(result).toEqual({
                status: 200,
                contacts: contacts
            });
        });
    });

    describe('updateContact', () => {
        it('should return error if contact does not exist', () => {
            const nonExistentError = { status: 404, message: 'Contact not found' };
            const contactMock = { firstName: 'non existing', lastName: ' name ', phoneNumber: '1234567890' };

            mockValidator.validateIfContactExists.mockReturnValue(nonExistentError);

            const result = contactService.updateContact('nonexistent', contactMock);

            expect(result).toEqual(nonExistentError);
        });

        it('should return validation error if data is invalid', () => {
            const validationError = { status: 400, message: 'Invalid data' };
            const contactMockWithError = { firstName: 'n', lastName: ' name ', phoneNumber: '123' };

            mockValidator.validateIfContactExists.mockReturnValue(null);
            mockValidator.validatePhoneAndName.mockReturnValue(validationError);

            const result = contactService.updateContact('1', contactMockWithError);

            expect(result).toEqual(validationError);
        });

        it('should update contact successfully', () => {
            const updatedContact = { id: '1', firstName: 'Updated', lastName: 'Name', phoneNumber: '1234567890' };

            mockValidator.validateIfContactExists.mockReturnValue(null);
            mockValidator.validatePhoneAndName.mockReturnValue(null);
            mockRepository.updateContact.mockReturnValue(updatedContact);

            const result = contactService.updateContact('1', updatedContact);

            expect(result).toEqual({
                status: 201,
                message: 'Contact successfully updated',
                contact: updatedContact
            });
        });
    });

    describe('deleteContact', () => {
        it('should return error if contact does not exist', () => {
            const nonExistentError = { status: 404, message: 'Contact not found' };

            mockValidator.validateIfContactExists.mockReturnValue(nonExistentError);

            const result = contactService.deleteContact('nonexistent');

            expect(result).toEqual(nonExistentError);
        });

        it('should delete contact successfully', () => {
            mockValidator.validateIfContactExists.mockReturnValue(null);
            mockRepository.deleteContact.mockReturnValue(true);

            const result = contactService.deleteContact('1');

            expect(result).toEqual({ status: 200 });
        });

        it('should return 500 status if deletion fails', () => {
            mockValidator.validateIfContactExists.mockReturnValue(null);
            mockRepository.deleteContact.mockReturnValue(false);

            const result = contactService.deleteContact('1');

            expect(result).toEqual({ status: 500 });
        });
    });
});
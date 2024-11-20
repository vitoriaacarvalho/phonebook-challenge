import { Contact } from "../services/contact/contact.dto"

interface FilterContactsProps {
    filteredContacts: Contact[]
    handleEdit: (contact: Contact) => void;
    handleDelete: (contact: Contact) => void;
}

const FilterContacts = ({filteredContacts, handleEdit, handleDelete}: FilterContactsProps) => {
    return (
        <div className="overflow-y-auto h-96 rounded-lg border border-gray-200">
            {filteredContacts.map((contact) => (
                <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
                >
                    <div className="space-y-1">
                        <h3 className="font-medium text-gray-800">
                            {contact.firstName} {contact.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(contact)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleDelete(contact)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FilterContacts

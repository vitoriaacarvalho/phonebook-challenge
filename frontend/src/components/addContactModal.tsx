import { FormEvent } from 'react'
import { Contact } from '../services/contact/contact.dto'

interface ContactModalProps {
    selectedContact: Contact | null
    handleSubmit: (e: FormEvent<Element>) => Promise<void>
    formData: { 
        firstName: string
        lastName: string 
        phoneNumber: string
    }
    setFormData: React.Dispatch<React.SetStateAction<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
    }>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddContactModal = ({selectedContact, handleSubmit, formData, setFormData, setIsModalOpen}: ContactModalProps) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">{selectedContact ? "Edit Contact" : "Add New Contact"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                                {selectedContact ? "Update" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContactModal

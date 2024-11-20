import { Contact } from "../services/contact/contact.dto"

interface DeleteModalProps {
    selectedContact: Contact | null
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    deleteContact: (id: string) => Promise<number>
    listContacts: () => Promise<void>  
}


const DeleteContactModal = ({selectedContact, setIsDeleteModalOpen, deleteContact, listContacts}: DeleteModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this contact?</p>
                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            if (selectedContact) {
                                await deleteContact(selectedContact.id);
                                setIsDeleteModalOpen(false);
                                listContacts();
                            }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteContactModal

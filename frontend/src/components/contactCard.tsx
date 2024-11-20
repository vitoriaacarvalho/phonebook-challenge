interface ContactCardProps {
    resetForm: () => void
    setIsModalOpen: (open: boolean) => void
}

const ContactCard: React.FC<ContactCardProps> = ({ resetForm, setIsModalOpen }) => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Contacts</h2>
            <button
                onClick={() => {
                    resetForm();
                    setIsModalOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>Add Contact</span>
            </button>
        </div>
    )
}

export default ContactCard

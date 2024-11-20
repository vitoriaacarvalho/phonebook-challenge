interface searchInputProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchContactsInput = ({searchTerm, setSearchTerm}: searchInputProps) => {
    return (
        <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}

export default SearchContactsInput

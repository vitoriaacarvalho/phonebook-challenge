import React, { useState, useEffect } from "react";
import { getContacts, addContact, deleteContact, updateContact } from "./services/contact/contact.service";
import { Contact } from "./services/contact/contact.dto";
import AddContactModal from "./components/addContactModal";
import PhoneBookCard from "./components/phoneBookCard";
import ContactCard from "./components/contactCard";
import SearchContactsInput from "./components/searchContactsInput";
import FilterContacts from "./components/filterContacts";
import DeleteContactModal from "./components/deleteContactModal";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  async function listContacts() {
    const fetchedContacts = await getContacts();
    setContacts(fetchedContacts);
  }

  function handleEdit(contact: Contact) {
    setSelectedContact(contact);
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
    });
    setIsModalOpen(true);
  }

  function handleDelete(contact: Contact) {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  }

  function resetForm() {
    setFormData({ firstName: "", lastName: "", phoneNumber: "" });
    setSelectedContact(null);
  }

  useEffect(() => {
    listContacts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (selectedContact) {
        await updateContact(selectedContact.id, formData as Contact);
        toast.success('✨ Contact updated successfully');
      } else {
        await addContact(formData as Contact);
        toast.success('✨ Contact added successfully');
      }
      setIsModalOpen(false);
      resetForm();
      listContacts();
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );

  return (

    <div className="h-screen flex items-center justify-center bg-gray-50">

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg">
        <PhoneBookCard />
        <ContactCard resetForm={resetForm} setIsModalOpen={setIsModalOpen} />
        <SearchContactsInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterContacts filteredContacts={filteredContacts} handleEdit={handleEdit} handleDelete={handleDelete} />
        { isModalOpen && (<AddContactModal selectedContact={selectedContact} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} setIsModalOpen={setIsModalOpen} />)}
          {isDeleteModalOpen && (<DeleteContactModal selectedContact={selectedContact} setIsDeleteModalOpen={setIsDeleteModalOpen} deleteContact={deleteContact} listContacts={listContacts} />)}
      </div>
    </div>
  );
}

import axios, { AxiosError } from "axios";
import { Contact } from "./contact.dto";

const api = axios.create({
  baseURL: `http://localhost:4000/api`,
});

const onRejected = async (error: AxiosError) => {
  console.log(error);
};

export const getContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/contacts");
  return response.data.body;
};
export const addContact = async (contact: Contact) => {
  const response = await api.post("/contacts", contact);
  console.log("Status:", response.status);
  return response.data;
};


export const deleteContact = async (id: string) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.status;
};

export const updateContact = async (id: string, contact: Contact) => {
  const response = await api.put(`/contacts/${id}`, contact);
  return response.data;
};

api.interceptors.response.use((response) => response, onRejected);

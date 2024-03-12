import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");

export const addContact = (body) => Contact.create(body);

export const getContactById = (id) => Contact.findById(id);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateById = (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateStatusById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

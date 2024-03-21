import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, "-createdAt -updatedAt", query).populate(
    "owner",
    "name email"
  );

export const addContact = (body) => Contact.create(body);

export const getContactById = (filter) => Contact.findOne(filter);

export const removeContact = (filter) => Contact.findByIdAndDelete(filter);

export const updateById = (filter, data) =>
  Contact.findByIdAndUpdate(filter, data);

export const updateStatusById = (filter, data) =>
  Contact.findByIdAndUpdate(filter, data);

export const getContactByDetails = async ({ name, email, phone, owner }) => {
  return await Contact.findOne({ name, email, phone, owner });
};

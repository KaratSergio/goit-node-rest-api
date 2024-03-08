import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsServices.removeContact(id);
  if (!deletedContact) throw HttpError(404);
  res.json(deletedContact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await contactsServices.addContact(name, email, phone);
  if (!contact) {
    throw HttpError(400);
  }
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const updatedContact = await contactsServices.updateById(id, req.body);
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.status(200).json(updatedContact);
};

export const ctrl = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  if (!contacts) throw HttpError(404);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.removeContact(id);
  if (!deletedContact) throw HttpError(404);
  res.json(deletedContact);
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  if (!newContact) {
    throw HttpError(400);
  }
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactsService.updateById(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const favoredContact = await contactsService.updateStatusById(id, req.body, {
    new: true,
  });
  if (!favoredContact) {
    throw HttpError(404);
  }
  res.status(200).json(favoredContact);
};

export const ctrl = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

import express from 'express';
import { ContactRepository } from '../repositories/ContactRepository';
import { ContactService } from '../services/ContactService';
import { ContactController } from '../controllers/ContactController';
import { ValidateData } from '../services/helpers/ValidateData';

const router = express.Router();

const contactRepository = new ContactRepository();
const validator = new ValidateData(contactRepository);
const contactService = new ContactService(contactRepository, validator);
const contactController = new ContactController(contactService);

router.post('/contacts', contactController.insertContact);
router.get('/contacts', contactController.findAllContacts);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

export default router;
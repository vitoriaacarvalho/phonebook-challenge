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

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Creates a new contact in the phone book. Accepts only US based phone numbers
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response, created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 contact:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     phoneNumber: 
 *                       type: string
 *                       example: "123-456-7890"
 *       500:
 *         description: Unsuccessful response. Internal server error.
 *       400:
 *         description: Bad request. The first name must be longer than 1 letter and the phone number must be US based
 */
router.post('/contacts', contactController.insertContact);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all available contacts
 *     description: Retrieves a list from memory data with all existing previously created contacts.
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successful response with list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                      type: string
 *                   phoneNumber: 
 *                      type: string 
 *       500:
 *         description: Unsuccessful response. Internal server error. 
 */
router.get('/contacts', contactController.findAllContacts);
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a specific contact
 *     description: Updates the details of an existing contact by its ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/contacts/:id', contactController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a specific contact
 *     description: Deletes a contact by its ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the contact to delete.
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/contacts/:id', contactController.deleteContact);


export default router;
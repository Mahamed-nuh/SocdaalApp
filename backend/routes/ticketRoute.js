const express = require('express');
const { createTicket, getTicket, getTickets, updateTicket, deleteTicket} = require('../controllers/ticketController');

const router = express.Router();



//create a new ticket
router.post('/', createTicket)
//get all tickets
router.get('/', getTickets)
//get a single ticket
router.get('/:id', getTicket)
//update a ticket
router.patch('/:id', updateTicket)
//delete a ticket
router.delete('/:id', deleteTicket)

module.exports = router


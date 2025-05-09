const express = require('express');
const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');
const router = express.Router();

//create a ticket
const createTicket = async (req, res) => {
    const {user, bus, company, seats, totalPrice, boardringPoint, droppingPoint, bookingDate, time } = req.body
    try {
        const ticket = await Ticket.create({user, bus, company, seats, totalPrice, boardringPoint, droppingPoint, bookingDate, time})
        res.status(200).json({ticket})
    } catch (error) {
        res.status(400).json({mssg: 'error creating a ticket'}) 
    }
}

//get all ticketes
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.status(200).json({tickets})
    } catch (error) {
        res.status(400).json({mssg: 'There is no tickets'}) 
    }
}
//get a single ticket
const getTicket = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'ticket not found'}) 
    }
    const ticket = await Ticket.findById(id)
    if(!ticket){
        return res.status(404).json({mssg: 'ticket not found'})
    }

    res.status(200).json({ticket})
}

//update a ticket
const updateTicket = async (req, res) => {
    const { id } = req.params
    const {user, bus, company, seats, totalPrice, boardringPoint, droppingPoint, bookingDate, time } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'ticket not found'}) 
    }
    const ticket = await Ticket.findByIdAndUpdate({_id: id},{
        ...req.body
    })
    if(!ticket){
        return res.status(404).json({mssg: 'ticket not found'})
    }
    res.status(200).json({ticket})
}

//delete a ticket
const deleteTicket = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'ticket not found'}) 
    }
    const ticket = await Ticket.findByIdAndDelete(id)
    if(!ticket){
        return res.status(404).json({mssg: 'ticket not found'})
    }

    res.status(200).json({mssg: 'ticket deleted'})
}

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket
}
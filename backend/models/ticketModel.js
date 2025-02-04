const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    seats: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    boardingPoint: { type: String, required: true },
    droppingPoint: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    time: { type: Date, required: true }},
     { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
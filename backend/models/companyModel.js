const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    bus: [{ type: Schema.Types.ObjectId, ref: 'Bus', required: true}],
    ticket: [{ type: Schema.Types.ObjectId, ref: 'Ticket', required: true}],
    driver: { type: String, required: true},
    
}, {timestamps: true});

module.exports = mongoose.model('Company', companySchema);
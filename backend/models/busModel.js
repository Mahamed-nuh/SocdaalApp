const mongoose = require('mongoose');
const company = require('./companyModel');

const Schema = mongoose.Schema;

const busSchema = new Schema({
    company: { type: String, required: true},
    busNumber: { type: String, required: true},
    travelTime: { type: String, required: true },
    availability: { type: Number, required: true },
    price: { type: Number, required: true },
    durationTime: { type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Bus', busSchema);

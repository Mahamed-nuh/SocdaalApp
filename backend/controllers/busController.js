const express = require('express');
const mongoose = require('mongoose'); // Add this line
const Bus = require('../models/busModel');

const router = express.Router();

//get a single bus
const getBus = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'bus not found'}) 
    }
    const bus = await Bus.findById(id)
    if(!bus){
        return res.status(404).json({mssg: 'bus not found'})
    }
}

//get all buses
const getBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json({ buses });
    } catch (error) {
        res.status(400).json({ mssg: 'error fetching buses' });
    }
}

//create a new bus
const createBus = async (req, res) => {
    const { company, busNumber, travelTime, availability, price, durationTime } = req.body;
    try {
        const bus = await Bus.create({ company, busNumber, travelTime, availability, price, durationTime });
        res.status(200).json({ bus });
    } catch (error) {
        res.status(400).json({ mssg: 'error creating a bus' });
    }
}

//update a bus
const updateBus = async (req, res) => {
    const { id } = req.params;
    const { company, busNumber, travelTime, availability, price, durationTime } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ mssg: 'bus not found' });
    }
    const bus = await Bus.findByIdAndUpdate(id, { company, busNumber, travelTime, availability, price, durationTime }, { new: true });
    res.status(200).json({ bus });
}

//delete a bus
const deleteBus = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'bus not found'}) 
    }
    await Bus.findByIdAndDelete(id)
    res.status(200).json({mssg: 'bus deleted successfully'})
}

module.exports = {getBus, getBuses, createBus, updateBus, deleteBus}
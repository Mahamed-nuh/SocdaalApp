const express = require('express');
const Company = require('../models/companyModel');

const router = express.Router();

//get a single company
const getCompany = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'company not found'}) 
    }
    const company = await Company.findById(id)
    if(!company){
        return res.status(404).json({mssg: 'company not found'})
    }
}
//get all companies
const getCompanies = async (req, res) => {
    const companies = await Company.find()
    res.status(200).json({companies})
}

//create a new company
const createCompany = async (req, res) => {
    const {name, branch, bus, ticket, driver} = req.body
    try {
        const company = await Company.create({name, branch, bus, ticket, driver})
        res.status(200).json({company})
    } catch (error) {
        res.status(400).json({mssg: 'error creating a company'}) 
    }
}
//update a company
const updateCompany = async (req, res) => {
    const {id} = req.params
    const {name, branch, bus, ticket, driver} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'company not found'}) 
    }
    const company = await Company.findByIdAndUpdate(id, {name, branch, bus, ticket, driver}, {new: true})
    res.status(200).json({company})
}
//delete a company
const deleteCompany = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({mssg: 'company not found'}) 
    }
    await Company.findByIdAndDelete(id)
    res.status(200).json({mssg: 'company deleted'})
}
module.exports = {getCompany, getCompanies, createCompany, updateCompany, deleteCompany}
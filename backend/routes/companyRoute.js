const express = require('express')
const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/companyController')
const mongoose = require('mongoose')


const router = express.Router()

//get all companies
router.get('/', getCompanies)
//get a single company
router.get('/:id', getCompany)
//create a new company
router.post('/', createCompany)
//update a company
router.patch('/:id', updateCompany)
//delete a company
router.delete('/:id', deleteCompany)



module.exports = router
const express = require('express');
const { createBus, getBus, getBuses, updateBus, deleteBus} = require('../controllers/busController');

const router = express.Router();

//get all buses
router.get('/', getBuses)
//get a single bus
router.get('/:id', getBus) 
//create a new bus
router.post('/', createBus)  
//update a bus
router.patch('/:id', updateBus) 
//delete a bus
router.delete('/:id', deleteBus) 

module.exports = router
const express = require('express');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

const router = express.Router();

//signup
const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const currentUser = await user.login(email, password);
        const token = createToken(currentUser._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//signin
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await user.signup(username, email, password);
        const token = createToken(newUser._id);

        res.status(200).json({ username, email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    logIn,
    signUp,
    getAllUsers
};
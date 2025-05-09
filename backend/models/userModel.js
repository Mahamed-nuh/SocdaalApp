const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    }
});

userSchema.statics.signup = async function (username, email, password) {
    if(!username || !email || !password) {
        throw new Error('Please fill all the fields!!');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Please provide a valid email');
    }


    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.create({
        username,
        email,
        password: hashedPassword
    });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw new Error('Please provide email and password');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Email does not exist');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }
    return user;
}


module.exports = mongoose.model('User', userSchema);
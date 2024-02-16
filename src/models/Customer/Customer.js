const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'customer', enum: ['customer', 'agent', 'admin', 'portalAdmin']},
    phone: {type: String},
    cnic: {type: String},
    dob: {type: Date},
    address: {type: String},
    profileImage: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);

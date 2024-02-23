const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Agent-specific information
const agentDetailsSchema = new Schema({
  agent_name: {type: String},
  agent_address: {type: String},
  agent_mobile_no: {type: String},
  agent_email: {type: String},
  agent_NTN: {type: String},
  agent_qualifications: {type: String},
  agent_cnic_front: {type: String},
  agent_cnic_back: {type: String},
  agent_documents: [String],
}, {_id: false}); // Prevent Mongoose from creating a separate _id for this sub-document

// Main user schema
const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default: 'customer', enum: ['admin', 'portalAdmin', 'customer', 'agent']},
  phone: {type: String},
  cnic: {type: String},
  dob: {type: Date},
  address: {type: String},
  profileImage: {type: String},
  refreshTokens: {type: [String], default: []},

  // Optional agent details
  agentDetails: agentDetailsSchema
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);

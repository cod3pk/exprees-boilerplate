const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileUrl: {type: String, required: true},
    uploadedAt: {type: Date, default: Date.now},
    fileType: {type: String, required: true},
    fileName: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Media', mediaSchema);

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bookName: {
        required: true,
        type: String,
    },
    schoolYear: {
        required: true,
        type: Number,
    },
    yearOfIssue: {
        required: true,
        type: Number,
    },
    publishingHouse: {
        required: true,
        type: String,
    },
    authors: [String],


});


module.exports = mongoose.model('Data', dataSchema);
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bookType: {
        type: String,
        enum: ['general', 'specialty'],
    },
    specialty: {
        type: String,
    },
    bookName: {
        type: String,
    },
    schoolYear: {
        type: Number,
    },
    yearOfIssue: {
        type: Number,
    },
    authors: [String],
    pagesCount: {
        type: Number,
    },
    exemplarsCount: {
        type: Number,
    }


});


module.exports = mongoose.model('Data', dataSchema);
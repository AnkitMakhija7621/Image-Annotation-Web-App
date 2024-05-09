const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    annotation: {
        type: String,
        default: 'Unlabeled',
    },
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;

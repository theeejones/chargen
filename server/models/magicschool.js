let mongoose = require('mongoose');

let MagicSchoolSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        desc: { type: String },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('MagicSchool', MagicSchoolSchema);
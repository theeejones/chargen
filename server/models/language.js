let mongoose = require('mongoose');

let LanguageSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        type: { type: String },
        typical_speakers: [{ type: String }],
        script: { type: String },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Language', LanguageSchema);
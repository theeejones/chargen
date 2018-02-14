let mongoose = require('mongoose');
let Class = require('./class');
let Race = require('./race');
let Schema = mongoose.Schema;

let ProficiencySchema = new mongoose.Schema({
        index: { type: Number },
        type: { type: String },
        name: { type: String },
        classes: [{ type: Number, ref: 'Class' }],
        races: [{ type: Number, ref: 'Race' }],
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Proficiency', ProficiencySchema);
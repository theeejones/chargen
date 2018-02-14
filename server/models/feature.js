let mongoose = require('mongoose');
let Class = require('./class');
let Schema = mongoose.Schema;

let FeatureSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        desc: { type: String },
        level: { type: Number },
        class: { type: Number, ref: 'Class' },
        url: { type: String }
    },
{ timestamps: false });

module.exports = mongoose.model('Feature', FeatureSchema);
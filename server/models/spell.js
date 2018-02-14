let mongoose = require('mongoose');
let MagicSchool = require('./magicschool');
let Class = require('./class');
let Schema = mongoose.Schema;

let SpellSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        desc: [{ type: String }],
        higher_level: [{ type: String }],
        range: { type: String },
        components: [{ type: String }],
        material: { type: String },
        ritual: { type: String },
        duration: { type: String },
        concentration: { type: String },
        casting_time: { type: String },
        level: { type: Number },
        school: { type: Number, ref: 'MagicSchool' },
        classes: [{ type: Number, ref: 'Class' }],
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Spell', SpellSchema);
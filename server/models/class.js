let mongoose = require('mongoose');
let Proficiency = require('./proficiency');
let Level = require('./level');
let Spellcasting = require('./spellcasting');
let Schema = mongoose.Schema;

let ClassSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        hit_die: { type: Number },
        proficiency_choices: [[{ type: Number, ref: 'Proficiency' }]],
        proficiency_choices_num: [{ type: Number }],
        base_proficiencies: [{ type: Number, ref: 'Proficiency' }],
        starting_equipment: { type: Number },
        class_levels: { type: String, ref: 'Level' },
        spellcasting: { type: Number, ref: 'Spellcasting' },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Class', ClassSchema);
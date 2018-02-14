let mongoose = require('mongoose');
let Proficiency = require('./proficiency');
let Language = require('./language');
let Schema = mongoose.Schema;

let RaceSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        speed: { type: Number },
        ability_bonuses: [{ type: Number }],
        alignment: { type: String },
        age: { type: String },
        size: { type: String },
        size_desc: { type: String },
        starting_proficiencies: [{ type: Number, ref: 'Proficiency' }],
        proficiency_choices: [{ type: Number, ref: 'Proficiency' }],
        proficiency_choice_num: { type: Number },
        starting_languages: [{ type: Number, ref: 'Language' }],
        language_choices: [{ type: Number, ref: 'Language' }],
        language_choices_num: { type: Number },
        language_desc: { type: String },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Race', RaceSchema);
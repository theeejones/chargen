let mongoose = require('mongoose');
let AbilityScore = require('./abilityscore');
let Schema = mongoose.Schema;

let SkillSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        desc: { type: String },
        ability_score: { type: Number },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Skill', SkillSchema);
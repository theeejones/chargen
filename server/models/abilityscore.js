let mongoose = require('mongoose');
let Skill = require('./skill');
let Schema = mongoose.Schema;

let AbilityScoreSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        full_name: { type: String },
        desc: [{ type: String }],
        skill_list: [{ type: Number, ref: 'Skill' }],
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('AbilityScore', AbilityScoreSchema);
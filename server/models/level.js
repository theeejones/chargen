let mongoose = require('mongoose');
let Feature = require('./feature');
let Class = require('./class');
let Schema = mongoose.Schema;

let LevelSchema = new mongoose.Schema({
        index: { type: Number },
        class: { type: Number, ref: 'Class'},
        level: { type: Number },
        ability_score_bonuses: { type: Number },
        prof_bonus: { type: Number },
        feature_choices: [{ type: Number, ref: 'Feature' }],
        features: [{ type: Number, ref: 'Feature' }],
        spellcasting: { type: Schema.Types.Mixed },
        class_specific: { type: Schema.Types.Mixed },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Level', LevelSchema);
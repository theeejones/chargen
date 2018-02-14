let mongoose = require('mongoose');
let Class = require('./class');
let AbilityScore = require('./abilityscore');
let Schema = mongoose.Schema;

let SpellcastingSchema = new mongoose.Schema({
        index: { type: Number },
        class: { type: Number, ref: 'Class' },
        level: { type: Number },
        spellcasting_ability: { type: Number, ref: 'AbilityScore' },
        info: [{ type: Schema.Types.Mixed }],
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Spellcasting', SpellcastingSchema);
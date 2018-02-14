let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EquipmentSchema = new mongoose.Schema({
        index: { type: Number },
        name: { type: String },
        equipment_category: { type: String },
        url: { type: String }
    },
{timestamps: false});

module.exports = mongoose.model('Equipment', EquipmentSchema);
let mongoose        = require('mongoose'),
    bcrypt          = require('bcrypt-as-promised'),
    session         = require('express-session'),
    request         = require('request'),
    // fs              = require('fs'),
    User            = require('../models/user'),
    AbilityScore    = require('../models/abilityscore'),
    Class           = require('../models/class'),
    Equipment       = require('../models/equipment'),
    Feature         = require('../models/feature'),
    Language        = require('../models/language'),
    Level           = require('../models/level'),
    MagicSchool     = require('../models/magicschool'),
    Proficiency     = require('../models/proficiency'),
    Race            = require('../models/race'),
    Skill           = require('../models/skill'),
    Spell           = require('../models/spell'),
    Spellcasting    = require('../models/spellcasting');

module.exports = {
    build_tables: (req, res) => {
        switch(req.params.table) {
            case 'abilityscore':    build_abilityscore(res);
                                    break;
            case 'class':           build_class(res);
                                    break;
            case 'equipment':       build_equipment(res);
                                    break;
            case 'feature':         build_feature(res);
                                    break;
            case 'language':        build_language(res);
                                    break;
            case 'level':           build_level(res);
                                    break;
            case 'magicschool':     build_magicschool(res);
                                    break;
            case 'proficiency':     build_proficiency(res);
                                    break;
            case 'race':            build_race(res);
                                    break;
            case 'skill':           build_skill(res);
                                    break;
            case 'spell':           build_spell(res);
                                    break;
            case 'spellcasting':    build_spellcasting(res);
                                    break;
            case 'test_queries':    test_queries(res);
                                    break;
            default:                return(res.status(400).json());
        }
    }
}

function build_abilityscore(res) {
    for(var i = 1; i < 7; i++) {
        request('http://dnd5eapi.co/api/ability-scores/' + i, { json: true }, (err, res, body) => {
            var score = new AbilityScore(), skill = [], skills = [];
            score.index = parseInt(body.index);
            score.name = body.name;
            score.full_name = body.full_name;
            score.desc = body.desc;
            score.url = body.url
            for(var k = 0; k < body.skills.length; k++) {
                skill = body.skills[k].url.split("/");
                skills.push(parseInt(skill[skill.length - 1]));
            }
            score.skill_list = skills;
            score.save((error) => {
                console.log(error);
            });
        });
    }
}

function build_class(res) {
    for(var i = 1; i < 13; i++) {
        console.log(i);
        request('http://dnd5eapi.co/api/classes/' + i, { json: true }, (err, res, body) => {
            var aclass = new Class(), temp = [], arr = [], arrs = [];
            aclass.index = parseInt(body.index);
            aclass.name = body.name;
            aclass.hit_die = body.hit_die;
            for(var j = 0; j < body.proficiency_choices.length; j++) {
                arr = [];
                aclass.proficiency_choices_num.push(parseInt(body.proficiency_choices[j].choose));
                for(var k = 0; k < body.proficiency_choices[j].from.length; k++) {
                    temp = body.proficiency_choices[j].from[k].url.split("/");
                    arr.push(parseInt(temp[temp.length - 1]));
                }
                arrs.push(arr);
            }
            aclass.proficiency_choices = arrs;
            for(var j = 0; j < body.proficiencies.length; j++) {
                arr = body.proficiencies[j].url.split("/");
                aclass.base_proficiencies.push(parseInt(arr[arr.length - 1]));
            }
            arr = body.starting_equipment.url.split("/");
            aclass.starting_equipment = arr[arr.length - 1];
            aclass.class_levels = body.class_levels.class;
            if(body.hasOwnProperty('spellcasting')) {
                arr = body.spellcasting.url.split("/")
                aclass.spellcasting = parseInt(arr[arr.length -1]);
            }
            aclass.url = body.url;
            aclass.save((error) => {
                if(error){
                    console.log(error);
                }
            });
        });
    }
}

function build_equipment(res) {
    for(var i = 1; i < 257; i++) {
        request('http://dnd5eapi.co/api/equipment/' + i, { json: true }, (err, res, body) => {
            if(err) { ( console.log(err)); }
            var equip = new Equipment();
            equip.index = body.index;
            equip.name  = body.name;
            equip.equipment_category = body.equipment_category;
            equip.url = body.url;
            equip.save((error) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    }
}

function build_feature(res) {
    for(var i = 1; i < 415; i++) {
        request('http://dnd5eapi.co/api/features/' + i, { json: true }, (err, res, body) => {
            var feature = new Feature(), splits = [];
            feature.index = body.index;
            feature.name = body.name;
            feature.desc = body.desc;
            feature.level = body.level;
            feature.url = body.url;
            splits = body.class.url.split("/");
            feature.class = parseInt(splits[splits.length - 1]);
            feature.save((error) => {
                if(error){
                    console.log(error);
                }
            });
        });
    }
}

function build_language(res) {
    for(var i = 1; i < 17; i++) {
        request('http://dnd5eapi.co/api/languages/' + i, { json: true }, (err, res, body) => {
            var lang = new Language();
            lang.index = body.index;
            lang.name = body.name;
            lang.type = body.type;
            lang.typical_speakers = body.typical_speakers;
            lang.script = body.script;
            lang.url = body.url;
            lang.save((error) => {
                if(error){
                    console.log(error);
                }
            });
        });
    }
}

function build_level(res) {

}

function build_magicschool(res) {
    for(var i = 1; i < 9; i++) {
        request('http://dnd5eapi.co/api/magic-schools/' + i, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var school = new MagicSchool();
            school.index = body.index;
            school.name = body.name;
            school.desc = body.desc;
            school.url = body.url;
            school.save((error) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    }
}

function build_proficiency(res) {
    for(var i = 1; i < 123; i++) {
        request('http://dnd5eapi.co/api/proficiencies/' + i, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var prof = new Proficiency(), splits = [], arr = [];
            prof.index = body.index;
            prof.type = body.type;
            prof.name = body.name;
            prof.url = body.url;
            for(var k = 0; k < body.classes.length; k++) {
                splits = body.classes[k].url.split("/");
                arr.push(parseInt(splits[splits.length - 1]));
            }
            prof.classes = arr;
            arr = [];
            for(var k = 0; k < body.races.length; k++) {
                splits = body.races[k].url.split("/");
                arr.push(parseInt(splits[splits.length - 1]));
            }
            prof.races = arr;
            prof.save((error) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    }
}

function build_race(res) {
    for(var i = 1; i < 10; i++) {
        request('http://dnd5eapi.co/api/races/' + i, { json: true }, (err, res, body) => {
            var race = new Race(), splits = [], arr = [];
            race.index = body.index;
            race.name  = body.name;
            race.speed = body.speed;
            race.ability_bonuses = body.ability_bonuses;
            race.alignment = body.alignment;
            race.age = body.age;
            race.size = body.size;
            race.size_desc = body.size_description;
            race.language_desc = body.language_desc;
            race.url = body.url;
            for(var k = 0; k < body.starting_proficiencies.length; k++) {
                splits = body.starting_proficiencies[k].url.split("/");
                arr.push(parseInt(splits[splits.length - 1]));
            }
            race.starting_proficiencies = arr;
            arr = [];
            if(body.hasOwnProperty('starting_proficiency_options')) {
                race.proficiency_choices_num = body.starting_proficiency_options.choose;
                for(var k = 0; k < body.starting_proficiency_options.from.length; k++) {
                    splits  = body.starting_proficiency_options.from[k].url.split("/");
                    arr.push(parseInt(splits[splits.length - 1]));
                }
                race.proficiency_choices = arr;
                arr = [];
            }
            for(var k = 0; k < body.languages.length; k++) {
                splits = body.languages[k].url.split("/");
                arr.push(parseInt(splits[splits.length - 1]));
            }
            race.starting_languages = arr;
            arr = [];
            if(body.hasOwnProperty('language_options')) {
                race.language_choices_num = body.language_options.choose;
                if(race.index == 7){
                    arr = [2,3,4,6,7,8,9,10,11,12,13,14,15,16];
                }
                else{
                    for(var k = 0; k < body.language_options.from.length; k++) {
                        splits  = body.language_options.from[k].url.split("/");
                        arr.push(parseInt(splits[splits.length - 1]));
                    }
                }
                race.language_choices = arr;
                arr = [];
            }
            race.save((error) => {
                if(error) {
                    console.log("index: ", i, error);
                }
            });
        });
    }
}

function build_skill(res) {
    for(var i = 1; i < 19; i++) {
        request('http://dnd5eapi.co/api/skills/' + i, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var skill = new Skill(), splits = [];
            skill.index = body.index;
            skill.name = body.name;
            skill.desc = body.desc;
            skill.url = body.url;
            splits = body.url.split("/");
            skill.ability_score = parseInt(splits[splits.length - 1]);
            skill.save();
        });
    }
}

function build_spell(res) {
    for(var i = 1; i < 306; i++) {
        request('http://dnd5eapi.co/api/spells/' + i, { json: true }, (err, res, body) => {
            if(err) {return console.log(err); }
            var spell = new Spell(), splits = [], arr = [];
            spell.index = body.index;
            spell.name = body.name;
            spell.desc = body.desc;
            if(body.hasOwnProperty('higher_level')){
                spell.higher_level = body.higher_level;
            }
            spell.range = body.range;
            spell.components = body.components;
            spell.material = body.material;
            spell.ritual = body.ritual;
            spell.duration = body.duration;
            spell.concentration = body.concentration;
            spell.casting_time = body.casting_time;
            spell.level = body.level;
            splits = body.school.url.split("/");
            spell.school = parseInt(splits[splits.length - 1]);
            for(var k = 0; k < body.classes.length; k++){
                splits = body.classes[k].url.split("/");
                arr.push(parseInt(splits[splits.length - 1]))
            }
            spell.classes = arr;
            spell.url = body.url;
            spell.save((error) => {
                if(error){
                    console.log(error);
                }
            });
        });
    }
}

function build_spellcasting(res) {
    for(var i = 1; i < 9; i++) {
        request('http://dnd5eapi.co/api/spellcasting/' + i, { json: true }, (err, res, body) => {
            if(err) {return console.log(err); }
            var casting = new Spellcasting(), splits = [], arr = [];
            casting.index = body.index;
            splits = body.class.url.split("/");
            casting.class = parseInt(splits[splits.length - 1]);
            casting.level = body.level;
            splits = body.spellcasting_ability.url.split("/");
            casting.spellcasting_ability = parseInt(splits[splits.length - 1]);
            casting.info = body.info;
            casting.url = body.url;
            casting.save((error) => {
                if(error){
                    console.log(error);
                }
            });
        });
    }
}

function test_queries(res) {
// AbilityScore.aggregate([
//     { $match: { index : { $gt : 0 } } }, 
//     { $lookup: { from: 'skills', localField: 'skill_list', foreignField: 'index', as: 'skills' } },
//     { $project: { _id: 0, name: 1, skills: 1 } }])
//         .exec((err, scores) => {
//             console.log(scores);
//         });
}
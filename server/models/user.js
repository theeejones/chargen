let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is a required field.'], 
        maxlength: 255, 
        unique: true,
        validate: [{
            validator: (address) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(address);
            },
            message: "The email address you entered does not appear to be valid."
        }]
    },
    first_name: { 
        type: String, 
        required: [true, 'First name is a required field.'],
        minlength: 2,
        maxlength: 50 
    },
    last_name: { 
        type: String, 
        required: [true, 'Last name is a required field.'], 
        minlength: 2,
        maxlength: 50
    },
    password: { 
        type: String, 
        required: [true, 'Password is a required field.'],
        minlength: 8, 
        maxlength: 50 
    },
    birthday: { 
        type: Date, 
        required: [true, 'Birthday is a required field.'],
        validate: [{
            validator: (date) => {
                return /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test(date);
            },
            message: "You did not enter a valid date."
        }] 
    },
    admin: {
        type: Boolean,
        default: false,
        required: false
    }
},
{timestamps: true});

module.exports = mongoose.model('User', UserSchema);
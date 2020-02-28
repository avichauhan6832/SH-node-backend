const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

const userSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    middleName : {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email);
            },
            message: 'Please fill a valid email address'
        }
        //validate: [validateEmail, 'Please fill a valid email address']
    },
    mobileNumber : {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return !/d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    address: {
        type: String,
        validate: {
            validator: function(str) {
                return str.length <= 100;
            },
            message: 'Length Should be less than 100 characters'
        }
    },
    city: {
        type: String,
        validate: {
            validator: function(str) {
                return str.length <= 25;
            },
            message: 'Length Should be less than 25 characters'
        }
    },
    state: {
        type: String,
        validate: {
            validator: function(str) {
                return str.length <= 50;
            },
            message: 'Length Should be less than 50 characters'
        }
    },
    postalCode: {
        type: Number,
        validate: {
            validator: function(v) {
                return !/d{6}/.test(v);
            },
            message: '{VALUE} is not a valid 6 digit number!'
        }
    },
    education: {
        type: String,
        enum: ['10th', '12th', 'Graduate', 'Post Graduate']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Not Selected']
    },
    occupation: {
        type: String,
        enum: ['Salaried', 'Self Employed', 'Other']
    }
},  {
    timestamps: true
});

// Validation for education gender occupation
userSchema.path('education').options.enum;
userSchema.path('gender').options.enum;
userSchema.path('occupation').options.enum;

userSchema.index({firstName: 'text', lastName: 'text'});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
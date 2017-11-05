var mongoose = require('mongoose'); // invoked mongoose modules
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/, // 2 imena sus space mejdutqh 
        message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Is not a valid e-mail'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?!.*?[\W]).{7,35}$/, // ?=.*? - pone 1 a,A,number,spetcialnez znak
        message: 'Password needs to have at least one lower case, one upper case, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [7, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];



var UserSchema = new Schema({
    name: { type: String, required: true, validate: nameValidator },
    username: { type: String, lowercase: true, required: true, unique: true, validate: usernameValidator },
    password: { type: String, required: true, validate: passwordValidator },
    email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator }
});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) { // kriptirane na parolata
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });

});

UserSchema.plugin(titlize, {
    paths: ['name']
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
        // sravnqva parolata poluchena ot usera s hash-a t.e. s zapaznenata v db ot usera pri registration
}


var User = module.exports = mongoose.model('User', UserSchema);

// get Books
module.exports.getUsers = function(callback, limit) {
        Users.find(callback).limit(limit);
    }
    // get Book
module.exports.getUserById = function(id, callback) {
        User.findById(id, callback);
    }
    // edit Book 
module.exports.editUser = function(id, user, options, callback) {
    var query = { _id: id };
    var edit = {
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email
    };
    User.findOneAndUpdate(query, edit, options, callback);
}
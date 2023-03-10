const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    }
});



userSchema.statics.signup = async function (email:string, password:string, firstName:string, role:string) {
    //validation
    if(!email || !password || !firstName){
        throw Error('All fields must be filled')
        return
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
        return
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
        return
    }

    const existsEmail = await this.findOne({email});
    if(existsEmail) {
        throw Error('Email already in use');
        return
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash, firstName, role});

    return user;
}

//static login method
userSchema.statics.login = async function (email:string, password:string) {
    if(!email  || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}


module.exports = mongoose.model('users', userSchema);
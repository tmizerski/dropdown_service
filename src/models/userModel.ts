const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
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
    }
});

userModel.statics.signup = async function (email:string, password:string, login:string, firstName:string) {
    const existsEmail = await this.findOne({email});
    const existsLogin = await this.findOne({login})
    if(existsEmail || existsLogin) {
        throw Error(existsEmail ? 'Email already in use' : 'Login already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash, login, firstName});

    return user;
}

module.exports = mongoose.model('User', userModel);
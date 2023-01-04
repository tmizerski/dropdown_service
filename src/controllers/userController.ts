require('../db/db');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id:any) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

const signupUser = async (req: any, res:any) => {
 const { email, password, firstName, role } = req.body;
 try {
     // const existsEmail = await User.findOne({email});
     // const existsLogin = await User.findOne({login})
     // if(existsEmail || existsLogin) {
     //      throw Error(existsEmail ? 'Email already in use' : 'Login already in use');
     // }
     // const salt = await bcrypt.genSalt(10);
     // const hash = await bcrypt.hash(password, salt);
     //
     // const user = await User.create({email, password: hash, login, firstName});
     const user = await User.signup(email, password, firstName, role);

     //create token
     const token = createToken(user._id)

   res.status(200).json({email, token})
 } catch(error:any){
   res.status(400).json(error.message)
 }
}

const loginUser = async (req:any, res:any) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password)
        const token = await createToken(user._id)

        res.status(200).json({email, token})
    } catch (error:any) {
        res.status(400).json(error.message)
    }
}

module.exports = {signupUser, loginUser}
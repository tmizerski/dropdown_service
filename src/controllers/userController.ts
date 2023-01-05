require('../db/db');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id:any) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

const signupUser = async (req: any, res:any) => {
 const { email, password, firstName, role } = req.body;
 try {
     const user = await User.signup(email, password, firstName, role);
     const token = createToken(user._id)

   res.status(200).json({email,user, token})
 } catch(error:any){
   res.status(400).json(error.message)
 }
}

const loginUser = async (req:any, res:any) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password)
        const token = await createToken(user._id)

        res.status(200).json({email,user, token})
    } catch (error:any) {
        res.status(400).json(error.message)
    }
}

module.exports = {signupUser, loginUser}
require('../db/db');
const User = require('../models/userModel');

const signupUser = async (req: any, res:any) => {
 const { email, password, login, firstName } = req.body;
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
     const user = User.signup(email, password, login, firstName);
   res.status(200).send({email, user})
 } catch(err:any){
   res.status(400).send(err, err.message)
 }
}

module.exports = {signupUser}
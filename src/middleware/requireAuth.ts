const jwebtoken = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const requireAuth = async (req:any, res:any, next:any) => {
    //verify authentication
    const { auth } = req.headers;

    if(!auth) {
        return res.status(401).json({error: "Authorization token required"});
    }

    const token = auth.split(" ")[1];

    try {
      const {_id} = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findOne({_id}).select('_id');
      next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = {requireAuth}
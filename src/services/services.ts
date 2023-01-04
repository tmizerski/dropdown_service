const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
import {User} from "../controllers/userInterface";

export async function signUp(req: any, res: any) {
    try {
        const client = new MongoClient(process.env.URL_DB);
        const conn = await client.connect();
        const db = await client.db("dropdown");
        const result = await db.collection('users').find({}).toArray();
        console.log(result)
        const { email, firstName,  login, password } = req.body;
        if(!email || !password || !firstName || !login) {
            res.status(400).send({msg: "Not all required data are given"});
            return
        }
        if(password.length < 6){
            res.status(400).send({msg: "Password is to short!"});
            return
        }
        if(!email.includes("@")){
            res.status(400).send({msg: "Mail adress should contain @ symbol"});
            return
        }
        if(firstName.length < 3 || login.length <3){
            res.status(400).send({msg: "Fields should have at least 3 symbols"});
            return
        }
        if(result.some((element:any) => element.email === email)) {
            res.status(400).send({msg: "This email is already used"});
            return
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const userData:User = {
            email,
            password: hashedPassword+"",
            firstName,
            login,
            role: "user",
        };

        await db.collection("users").insertOne({firstName: userData.firstName,email:userData.email, login: userData.login, pass: userData.password, role: userData.role});
        res.send("User added successfully")
    } catch (err) {
        res.send(err)
    }
}
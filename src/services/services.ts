const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

export async function signUp(req: any, res: any) {
    try {
        const { email, firstName,  login, password } = req.body;
        if(!email || !password || !firstName || !login) {
            res.status(400);
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword)
        const userData = {
            email,
            password: hashedPassword,
            firstName,
            login,
            role: "user",
        };
        const client = new MongoClient(process.env.URL_DB);
        const conn = await client.connect();
        const db = await client.db("dropdown");
        await db.collection("users").insertOne({firstName: userData.firstName, login: userData.login, pass: userData.password, role: userData.role});
        res.send("Dodano użytkownika")
    } catch (err) {
        res.send(err)
    }
}
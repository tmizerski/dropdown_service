const {MongoClient} = require('mongodb');

export async function addUser(req: any, res: any) {
    const client = new MongoClient(process.env.URL_DB);
    const data = req.data;
    try {
        const conn = await client.connect();
        if (conn) console.log(" Połączono z db");
        const db = await client.db("dropdown");
        const query = db.users.insertOne({firstName: data.firstName, lastName: data.lastName, login: data.login, pass: data.pass, role:data.role});
        res.send("Dodano użytkownika")
    } catch (err) {
        console.log(err)
    }
}
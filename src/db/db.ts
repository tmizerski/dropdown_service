const {MongoClient} = require('mongodb');

export async function run() {
    const client = new MongoClient(process.env.URL_DB);
    try{
        const conn = await client.connect();
        if(conn) console.log(" Połączono z db");
        await client.db("dropDown");

    } catch (err){
        console.log(err);
    } finally {
        const close = await client.close();
        if(close) console.log("Connection closed");
    }

}


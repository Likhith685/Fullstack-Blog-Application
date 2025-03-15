import mysql2 from "mysql2"

export const db = mysql2.createConnection(
    {
        host:"127.0.0.1",
        user:"root",
        password:"",
        database:"blog",
        port:3306
     }
)


db.connect((err) => {
    if (err) {
        console.error("Error connecting to localinstance2:", err.message);
        return;
    }
    console.log("Connected to localinstance2!");
});



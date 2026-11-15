
const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB configuration
const username = encodeURIComponent(
    process.env.MONGO_DB_USERNAME || "admin"
);

const password = encodeURIComponent(
    process.env.MONGO_DB_PASSWORD || "qwerty"
);

const host = process.env.MONGO_DB_HOST || "localhost";
const port = process.env.MONGO_DB_PORT || 27017;

const MONGO_URL = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

const client = new MongoClient(MONGO_URL);

let db;


// Home page
// app.get("/", (req, res) => {
//     res.send("Welcome to Test App! Docker is working successfully.");
// });

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const data = await db.collection("users")
            .find({})
            .toArray();

        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;

        console.log(userObj);

        const data = await db.collection("users")
            .insertOne(userObj);

        console.log(data);
        console.log("Data inserted in DB");

        res.send("User added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting user");
    }
});

// Connect MongoDB and start server
async function startServer() {
    try {
        await client.connect();

        console.log("MongoDB connected successfully");

        db = client.db("apnacollege-db");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}

startServer();







/* 
//This only works when mongo and mongo-express is in docker and running directly from vs code.

const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
    await client.connect(URL);
    console.log('Connected successfully to server');

    const db = client.db("apnacollege-db");
    const data = await db.collection('users').find({}).toArray();
    
    client.close();
    res.send(data);
});

//POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log(req.body);
    await client.connect(URL);
    console.log('Connected successfully to server');

    const db = client.db("apnacollege-db");
    const data = await db.collection('users').insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    client.close();
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
}); 

*/
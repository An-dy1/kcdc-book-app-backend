const express = require('express');
const cors = require('cors');
const { request } = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5005;

let collection;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://an-dy1:${process.env.MONGO_BOOKS_DB_PASSWORD}@cluster0.s1vyspe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
    collection = client.db('book-app').collection('books');
});

let app = express();
app.use(cors());
app.use(express.json());

app.get('/books', async(req, res) => {
    let data = await collection.find({}).toArray();
    res.send(data).status(200);
});

app.get('/books/:index', async(req, res) => {
    res.send({ data: data[req.params.index] }).status(200);
});

app.post('/books', async(req, res) => {
    let result = await collection.insertOne(req.body);
    res.send(result).status(201);
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
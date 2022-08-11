const express = require('express');
const cors = require('cors');
const { request } = require('express');

const PORT = process.env.PORT || 5005;
let data = [{
    title: 'Normal People',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwFHgvzFonpSXs_uQRIVnUDG9oN76uLo-7nA&usqp=CAU',
}, ];

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
    // perform actions on the collection object
    // client.close();
});

let app = express();
app.use(cors());
app.use(express.json());

app.get('/data', async(req, res) => {
    let data = await collection.find({}).toArray();
    console.log(data);
    res.send(data).status(200);
});

app.get('/data/:index', async(req, res) => {
    res.send({ data: data[req.params.index] }).status(200);
});

app.post('/book', async(req, res) => {
    // await connectToMongo();
    // data.push(req.body);
    let result = await collection.insertOne(req.body);
    res.send(result).status(201);
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
const express = require('express');
const cors = require('cors');
const { request } = require('express');

const PORT = process.env.PORT || 5005;
let data = [{
    title: 'Normal People',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwFHgvzFonpSXs_uQRIVnUDG9oN76uLo-7nA&usqp=CAU',
}, ];

let app = express();
app.use(cors(), express.json());
// app.use(express.json());

app.get('/data', async(req, res) => {
    res.send(data).status(200);
});

app.get('/data/:index', async(req, res) => {
    res.send({ data: data[req.params.index] }).status(200);
});

app.post('/book', async(req, res) => {
    req.setTimeout(10000, () => {
        data.push(req.body);
        res.status(201);
    });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
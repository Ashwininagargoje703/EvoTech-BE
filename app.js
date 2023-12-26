var express = require('express');
const mongoose = require('mongoose');

var app = express();
const cors = require('cors');
const connect = require('./configs/db')
app.use(express.json({ limit: '5mb' }));

app.use(cors());
ObjectId = mongoose.Types.ObjectId;
const userRoute = require('./routes/user');
const formRoute = require('./routes/form');
app.use('/user', userRoute);
app.use('/form', formRoute);

app.listen(process.env.PORT || 4000,async (err) => {
    await connect()
    if (err) throw err
    console.log('> Ready on http://localhost:4000')
})
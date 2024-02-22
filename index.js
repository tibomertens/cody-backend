const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config()

const cors = require('cors'); // Import the cors middleware
//import routes
const users = require('./routes/api/v1/users');



const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_PW);

//check if the connection is established
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
});

//import the routes
const renovationsRouter = require('./routes/api/v1/renovations');
const promotorsRouter = require('./routes/api/v1/promotors');

//json body parser
app.use(express.json());
app.use(cors()); // Use the cors middleware
app.use('/api/v1/users', users);
app.use('/api/v1/renovations', renovationsRouter);
app.use('/api/v1/promotors', promotorsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
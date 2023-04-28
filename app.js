const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/contactlist');

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', (err) =>{
    if(err)
    {
        console.log('Error in database connection: '+ err);
    }
});

//port number
const port = 3000;

//adding middleware - core
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing server
app.get('/', (req, resp) => {
    resp.send('foobar');
})

app.listen(port, () => {
    console.log('Server started at port: '+ port);
})


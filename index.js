const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');
const cors = require('cors');

const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000
let corsOptions = {
  origin: [ 'http://localhost:3000' ]
};

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log('Error on mongoDB connection: ', error);
})

database.once('connected', () => {
    console.log('Database successfully  connected');
})

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/api', routes);

app.get('/', function(req, res){
    res.sendFile('./views/index.html');
  });

  app.get("*", (req, res) => {
  
    res.send("No such route in this API");
  });


  

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
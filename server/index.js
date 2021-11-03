const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./routes/transaction.routes.js')(app);
require('./routes/loan.routes.js')(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// Database config

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database"); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
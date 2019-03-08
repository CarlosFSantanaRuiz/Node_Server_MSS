// Server dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database,{ useNewUrlParser: true });

// On Connect
mongoose.connection.on('Connected', () => {
    console.log('Connected to Database: ' + config.database)
});

// On Connect
mongoose.connection.on('error', (err) => {
    console.log('Database Error: ', err)
});

const app = express();

const users = require('./routes/users')

const port = 3000;

// Allow cross site requests
app.use(cors());

// Setup MyShopStatistics Angular App
app.use(express.static(path.join(__dirname, 'public')));

// Using body pareser middleware
app.use(bodyParser.json());


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Use index route for application
app.get('/', (req, res) =>{
    res.send('invalid end point')
});

// Start our node server
app.listen(port, () => {
    console.log('server started on port ' + port)
});
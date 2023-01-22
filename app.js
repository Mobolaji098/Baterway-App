const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");
require('dotenv').config();
// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));
//form-urlencoded

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.set('strictQuery', true)
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./src/middlewares/jwt")(passport);


//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./src/routes/index')(app);


//=== 5 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));
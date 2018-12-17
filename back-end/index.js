
const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

var bodyParser = require('body-parser')
var mongoose = require('mongoose');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to db");
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

// Avoid CORS
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, XRequested-With, Content-Type, Accept ");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS ');
    next();
});

// Testing route
app.route('/').get((req, res)=> {
    
    res.send("hello world");
});

// init routes
require("./routes/auth")(app);
require("./routes/cart")(app);
require("./routes/carts")(app);
require("./routes/comment")(app);
require("./routes/comments")(app);
require("./routes/items")(app);
require("./routes/notice")(app);
require("./routes/policy")(app);
require("./routes/users")(app);

// app.route("")
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
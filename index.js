const express = require("express");
const methodOverride = require('method-override');
const textController = require("./routes/textRoute");
require('dotenv').config()


const app = express();


let port = 3000;
let host = "localhost";
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.use('/', textController);

app.listen(port, host, () => {
    console.log("Server is running on port ", port);
})

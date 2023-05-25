const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');
const port =3000;

const stage = require("./route/stage_route");
const code = require("./route/insertcode_route");
const chargecode = require("./route/chargecode_route");
const course = require("./route/courses_route");
const lessons = require("./route/lesson_route");
const buycourse = require("./route/buycourse_route");



const AuthRouter = require('./route/auth_route');
const user_check =  require('./middleware/verify_user');
const admin_check =  require('./middleware/verify_admin');




mongoose.connect("mongodb+srv://bigproject:bigproject@cluster0.ody6e.mongodb.net/bigproject?retryWrites=true&w=majority",

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const connection = mongoose.connection;
connection.on('connected', () => { console.log("connect with cloud") });
connection.on('error', () => { console.log("error with database") });
app.use([bodyParser.urlencoded({ extended: true }), express.json(), express.urlencoded({ extended: true })]);
app.use(cors());
app.use('/auth', AuthRouter);

app.use('/code',code);
app.use('/chargecode',chargecode);
app.use('/course',course);
app.use('/lessons',lessons);
app.use('/buycourse',buycourse);



app.use('/stage',stage);




app.listen(process.env.PORT || 3000, () => {
    console.log("it is working");
})

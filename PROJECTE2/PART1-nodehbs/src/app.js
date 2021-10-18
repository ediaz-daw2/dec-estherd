const express= require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

const TWO_HOURS = 1000*60*60*2

const users=[
    {id:1, name:'Esther', password:'1234'},
    {id:2, name:'Irene', password:'1234'}

]

const app = express();

// settings
const {
    PORT=3030,
    SESS_LIFETIME=TWO_HOURS,
    NODE_ENV = 'development',
    SESS_NAME= 'sid',
    SESS_SECRET='ssh!quiet,it\'asecret!'
} = process.env

const IN_PROD =NODE_ENV==='production';

//SESSION
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))



// li diem al node on es troben els views.
app.set('views',path.join(__dirname,'views'));


// motor se templating (hbs)

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: __dirname + '/views/layouts', // ubicació dels parcials
}));

app.set('view engine','.hbs');

//middleware
app.use(morgan('dev'));

// routes
app.use
app.use(express.urlencoded({extended: false}));
// urlencode --> extended true --> enten objetes en general i qualsevol tipus de dades (en request)
// urlencode --> extended false --> enten strings i arrays
app.use(require('./routes/routes'));

// altres fitxers (assets)

app.use(express.static(path.join(__dirname,'/public')))

module.exports=app;

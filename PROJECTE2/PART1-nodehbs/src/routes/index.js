const express = require('express');
const router = express.Router();
const admin=require('firebase-admin');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

var serviceAccount = require("../myntflx-be435-firebase-adminsdk-75lnu-e69cb15097.json");
const { rawListeners, request } = require('../app');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://myntflx-be435-default-rtdb.firebaseio.com/'
});
const db=admin.database();

const TWO_HOURS=1000*60*60*2

const{
    PORT = 3000,
    NODE_ENV= 'development',
    SESS_NAME= 'sid',
    SESS_SECRET = 'ssh!quiet,it\'asecret!',
    SESS_LIFETIME= TWO_HOURS
} =process.env

const IN_PROD = NODE_ENV ==='production';

const users=[
    {id:1,
    nom: 'Esther',
    password:'123'}
]

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
    }
}))

const redirectLogin =(req,res,next)=>{
    if(!req.session.userID){
        res.redirect('/login')
    } else{
        next()
    }
}
const redirectHome =(req,res,next)=>{
    if(req.session.userID){
        res.redirect('/')
    } else{
        next()
    }
}

router.use((req,res,next)=>{
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.id===userID
        )
    }
    next()
})


router.get('/',(req, res) => {
    // Anire a la BBDD i agafare el que minteressi,
    // Crearé un objecte i el pasaré al render}
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.id===userID
        )
    }
    console.log(req.session);
    res.render('home',{
        title: "Home", 
        active: {Home: true},
        user: {userID}
    });
});     


router.get('/perfil',redirectLogin,(req,res)=>{
        const {user}=res.locals;

});




router.get('/',(req, res) => {
    // Anire a la BBDD i agafare el que minteressi,
    // Crearé un objecte i el pasaré al render}
    console.log(req.session);
    res.render('home',{
        title: "Home", 
        active: {Home: true}
    });
    
    
    const {user}=res.locals;
        res.send(`
            <h1>Welcome!</h1>
            ${user ? `
            <a href='/home'>Home</a>
            <form method='post' action='/logout'>
                <button>Logout</button>
            </form>
            `:`
            <a href='/login'>LOGIN</a>
            <a href='/register'>Register</a>
            `}
    
        `)
        app.get('/perfil',redirectLogin,(req,res)=>{
            const {user}=res.locals;
    
        })
});     

    

    /*
    if({userID}==1){
    res.render('index',{
        title: "Pàgina principal",
        txt: "miau",
        active: {Home: true}
    });
    }else{
        res.render('index',{
            title: "PAAAA",
            txt: "miau",
            active: {Home: true}
        });
    }
    */


router.get('/home',(req, res) => {
    res.render('home',{
        title: "Home", 
        active: {Home: true}
    });
});

router.get('/serveis',(req, res) => {
    res.render('serveis',{
        title: "Serveis", 
        active: {Serveis: true}
    });
});

router.get('/cataleg',(req, res) => {
    res.render('cataleg',{
        title: "Cataleg", 
        active: {Cataleg: true}
    });
});

router.get('/enquesta',(req, res) => {
    res.render('enquesta',{
        title: "Enquesta", 
        active: {Enquesta: true}
    });
});

router.get('/quiSom',(req, res) => {
    res.render('quiSom',{
        title: "Qui Som?", 
        active: {QuiSom: true}
    });
});

router.get('/contacte',(req, res) => {
    res.render('contacte',{
        title: "Contacte", 
        active: {Contacte: true}
    });
});

router.get('/insertar',redirectLogin,(req, res) => {
    db.ref('elements').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.render('insertar',{
            title: "AFEGEIX UN ELEMENT",
            active: {Login: true},
            elements: data
        });
    })
});

router.get('/delete-element/:id', (req,res)=>{
    db.ref('elements/'+req.params.id).remove();
    res.redirect('/insertar');
});

router.post('/nou-element',(req, res) => {
    const nouElement ={
        Nom: req.body.nom,
        Genere: req.body.genere,
        Nota: req.body.nota
    }
    db.ref('elements').push(nouElement);
    res.redirect('/insertar');
    
});

router.get('/register',redirectHome,(req, res) => {
    

    console.log(req.session);
        res.render('register',{
            title: "REGISTRA'T", 
            active: {Register: true}
        });
});

router.post('/register',redirectHome,(req, res) => {
    const {nom,password}=req.body;

    if(nom && password){
        const exists=users.some(
            user=>user.nom===nom
        )
        if (!exists){
            const user={
                id: users.length+1,
                nom,
                password
            }
            users.push(user)

            req.session.userID= user.id
            return res.redirect('/home')
        }
    } 
    res.redirect('register')
});

router.get('/login',(req, res) => {
    const {user}=res.locals;
    console.log(req.session);
        res.render('login',{
        user:`${user}`,
        title: "ADMIN login", 
        active: {Login: true}
    });
});

router.post('/login',redirectHome,(req, res) => {
    const{nom, password}=req.body

    if(nom&&password){
        const user= users.find(
            user=> user.nom ===nom && user.password === password
        )
        if(user){
            req.session.userID=user.id
            return res.redirect('/')
        }
    }
    res.redirect('/login');
});

router.get('/logout',redirectLogin,(req, res) => {
    res.render('logout',{
        active: {Logout: true}
    });
});

router.post ('/logout', redirectLogin,(req,res) =>{
    req.session.destroy(err =>{
        if (err){
            return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

router.get('/perfil',(req, res) => {
    res.render('perfil',{
        title: "Perfil", 
        active: {Perfil: true}
    });
});

module.exports=router;
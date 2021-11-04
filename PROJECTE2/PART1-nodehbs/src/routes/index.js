//instalar mongodb, cheat sheet (gestio desde terminal de mongodb), instalar i configurar en local Robo 3T, crear BD nosql de proves
// crear base de dades mongodb Atlas
// postman per a aracar al servidor nodejs + express

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

    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    res.render('home',{
        title: "Home", 
        active: {Home: true},
        text: "Que trobaràs en MyNTFLX?",
        user: {userID}
    });
});    

/*
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
*/

router.get('/perfil',redirectLogin,(req,res)=>{ 
    db.ref('elements').once('value',(snapshot)=>{
        //const element=(Object.values(snapshot.val()));

        const dades = snapshot.val();
        //console.log(dades);

        const {userID}=req.session;
        if(userID){
            res.locals.user=users.find(
                user=> user.nom===userID,
            )
        }
        element={};

        for (const key in dades) {
            if (Object.hasOwnProperty.call(dades, key)) {
                const elements = dades[key];
                if (elements.NomUser==userID.Nom){
                    element[key]=dades[key];
                }
            }
        }
        /*
        if(userID){
                const elements= element.find(
                   element=> element.NomUser ===userID.Nom
                )
                console.log(elements);
        
        */   
            // let elements=[];
            // element.forEach((element,index)=>{
            //     if(element.NomUser===userID.Nom){
            //         elements[index] = element;
            //     }
            // })
            // var el = {};
            // for (var i = 1; i < elements.length; ++i){
            //     el[i] = elements[i]; 
            // }
            // var elem={};
            // num=0;
            // for (var i = 1; i < elements.length; ++i){
            //     if (el[i]!=undefined){
            //         elem[num]=el[i]; 
            //         num++;
            //     }else{
                    
            //     }
            // }
        console.log(element);
            
        res.render('perfil',{
            title: "Perfil", 
            active: {Perfil: true},
            element,
            user: {userID},
            
        });
        //console.log("BBB", elem);
        //console.log("CCC" ,{userID});
        
    });
});




router.get('/serveis',(req, res) => {
    
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    res.render('serveis',{
        title: "Serveis", 
        active: {Serveis: true},
        user: {userID}
        
    });
});

router.get('/cataleg',(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    db.ref('elements').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.render('cataleg',{
            title: "Cataleg", 
            active: {Cataleg: true},
            user: {userID},
            elements: data
        });
    });
});

router.get('/enquesta',(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    db.ref('elements').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.render('enquesta',{
            title: "Enquesta", 
            active: {Enquesta: true},
            user: {userID},
            element: data
        });
    });
});

router.get('/quiSom',(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    res.render('quiSom',{
        title: "Qui Som?", 
        active: {QuiSom: true},
        user: {userID}
    });
});

router.get('/contacte',(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    res.render('contacte',{
        title: "Contacte", 
        active: {Contacte: true},
        user: {userID}

    });
});

router.get('/insertar',redirectLogin,(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    db.ref('elements').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.render('insertar',{
            title: "NOVA SÈRIE/PEL·LÍCULA",
            active: {Insertar: true},
            elements: data,
            user: {userID}
        });
    })
});

router.get('/delete-element/:id', (req,res)=>{
    db.ref('elements/'+req.params.id).remove();
    res.redirect('/insertar');
});

router.post('/nou-element',(req, res) => {
    const nouElement ={
        NomUser: req.body.nomuser,
        NomEl: req.body.nomel,
        Img: req.body.img,
        Genere: req.body.genere,
        Sinopsi: req.body.sinopsi,
        Nota: req.body.nota
    }
    db.ref('elements').push(nouElement);
    res.redirect('/insertar');
    
});

router.get('/register',redirectHome,(req, res) => {
    db.ref('usuaris').once('value',(snapshot)=>{
    const usuari = snapshot.val();

    console.log(req.session);
        res.render('register',{
            title: "REGISTRA'T", 
            active: {Register: true},
            usuaris: usuari
        });
    });
});


router.post('/nou-usuari',(req, res) => {
    const nouUsuari ={
        Nom: req.body.nom,
        Password: req.body.password,
        Admin: req.body.admin,
        Img: req.body.img
    }
    console.log(nouUsuari);
    db.ref('usuaris').push(nouUsuari);
    res.redirect('/login');

});

router.get('/login',(req, res) => {
    db.ref('usuaris').once('value',(snapshot)=>{
       const user = snapshot.val();
        res.render('login',{
        user:`${user}`,
        title: "LOGIN", 
        active: {Login: true}
    });
    });
});


/*
router.get('/login',(req, res) => {
    const {user}=res.locals;
    res.render('login',{
        user:`${user}`,
        title: "ADMIN login", 
        active: {Login: true}
    });
});
*/

router.post('/login',redirectHome,(req, res) => {
    const{nom, password}=req.body

    db.ref('usuaris').once('value',(snapshot)=>{
    const users=(Object.values(snapshot.val()));
    
     if(nom&&password){
         const usuaris= users.find(
            users=> users.Nom ===nom && users.Password === password
         )
         if(usuaris){
            req.session.userID=usuaris;
            //console.log("AAA ",usuaris);
            
            return res.redirect('/');
         }
     }
     res.redirect('/login');
});
});


/*
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
*/

router.get('/logout',redirectLogin,(req, res) => {
    const {userID}=req.session;
    if(userID){
        res.locals.user=users.find(
            user=> user.nom===userID,
        )
    }
    res.render('logout',{
        active: {Logout: true},
        user: {userID}
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


module.exports=router;
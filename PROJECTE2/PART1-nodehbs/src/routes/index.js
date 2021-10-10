const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
// Anire a la BBDD i agafare el que minteressi,
// Crearé un objecte i el pasaré al render
    res.render('index',{
        title: "Pàgina principal",
        txt: "miau",
        active: {Home: true}
    });
});

router.get('/serveis',(req, res) => {
    res.render('',{
        title: "Serveis", 
        active: {Serveis: true}
    });
});

router.get('/cataleg',(req, res) => {
    res.render('',{
        title: "Cataleg", 
        active: {Cataleg: true}
    });
});

router.get('/enquesta',(req, res) => {
    res.render('',{
        title: "Enquesta", 
        active: {Enquesta: true}
    });
});

router.get('/quiSom',(req, res) => {
    res.render('',{
        title: "Qui Som?", 
        active: {QuiSom: true}
    });
});

router.get('/contacte',(req, res) => {
    res.render('',{
        title: "Contacte", 
        active: {Contacte: true}
    });
});

router.get('/logo',(req, res) => {
    res.render('',{
        title: "Logo", 
        active: {Logo: true}
    });
});

router.get('/perfil',(req, res) => {
    res.render('',{
        title: "Perfil", 
        active: {Perfil: true}
    });
});

module.exports=router;
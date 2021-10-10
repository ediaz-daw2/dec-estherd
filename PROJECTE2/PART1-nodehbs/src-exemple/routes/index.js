const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
// Anire a la BBDD i agafare el que minteressi,
// Crearé un objecte i el pasaré al render

    res.render('index',
    {
        txt: "miau",
        title: "Home", 
        active: {Home: true}
    });
});

router.get('/contacte',(req, res) => {
    res.render('',{title: "Contacte", active: {Contacte: true}});
});
module.exports=router;
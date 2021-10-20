const {response,request}=require('express');
const bcryptjs = require ('bcryptjs');
const Usuari= require('../models/usuari');

const usuarisGet = async(req=request,res=response)=>{
    const usuaris= await Usuari.find();
    res.json({
        usuaris,
    });
}

const usuarisPost= async(req,res=response)=>{
    const {nom, estat,correu,password,rol,google}= req.body;
    const usuari = new Usuari({
        nom,
        estat,
        correu,
        password,
        rol,
        google
    });

    //Encriptar passwd
    const salt= bcryptjs.genSaltSync();
    usuari.password = bcryptjs.hashSync(password,salt);

    await usuari.save();

    res.json({
        usuari
    });
    /*  console.log(req.body);
    const resp = req.body;
    res.json({
        resp,
    })*/
}

module.exports={
    usuarisGet,
    usuarisPost
}

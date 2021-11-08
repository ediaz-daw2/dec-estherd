const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Servei = require("../models/servei");

const serveisGet = async (req = request, res = response) => {
  const serveis = await Servei.find();
  res.json({
    serveis,
  });
};

const serveisPost = async (req, res = response) => {
  const { nom, descripcio, preu, horari, disponibilitat } = req.body;
  const servei = new Servei({
    nom,
    descripcio,
    preu,
    horari,
    disponibilitat
  });


  await servei.save();

  res.json({
    servei,
  });
};

module.exports = {
  serveisGet,
  serveisPost,
};
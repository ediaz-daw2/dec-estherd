const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Client = require("../models/client");

const clientsGet = async (req = request, res = response) => {
  const clients = await Client.find();
  res.json({
    clients,
  });
};

const clientsPost = async (req, res = response) => {
  const { nom, correu, password, telefon, poblacio, adreca, estat, google } = req.body;
  const client = new Client({
    nom,
    correu,
    password,
    telefon,
    poblacio,
    adreca,
    estat,
    google,
  });


  // Encriptar passwd
  const salt = bcryptjs.genSaltSync();
  client.password = bcryptjs.hashSync(password, salt);

  await client.save();

  res.json({
    client,
  });
};

module.exports = {
  clientsGet,
  clientsPost,
};
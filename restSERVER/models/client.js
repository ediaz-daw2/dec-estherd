const { Schema, model } = require("mongoose");

const ClientSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  correu: {
    type: String,
    required: [true, "El correu és obligatori"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contrasenya és obligatoria"],
  },
  telefon:{
    type: String,
  },
  poblacio:{
    type: String,
    required: [true, "La població és obligatoria"],

  },
  adreca: {
    type: String,
    required: [true, "La adreça és obligatoria"],
  },
  
  estat: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

ClientSchema.methods.toJSON = function () {
  const { __v, password, ...client } = this.toObject();
  return client;
};

module.exports = model("Client", ClientSchema);
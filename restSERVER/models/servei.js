const { Schema, model } = require("mongoose");

const ServeiSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  descripcio: {
    type: String,
    required: [true, "La descripció és obligatoria"],
    unique: true,
  },
  preu: {
    type: String,
    required: [true, "El preu es obligatori"],
  },
  horari: {
    type: String,
    required: true,
  },
  disponibilitat: {
    type: Boolean,
    default: true,
  },
});


module.exports = model("Servei", ServeiSchema);
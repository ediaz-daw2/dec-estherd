const { v4: uuidv4 } = require("uuid");

class Tasca {
  id = "";
  nom = "";
  pendent = false;

  constructor(nom, pendent) {
    this.id = uuidv4();
    this.nom = nom;
    this.pendent = pendent;
  }
}

module.exports = Tasca;

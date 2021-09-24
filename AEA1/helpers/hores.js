require("colors");
const fs = require("fs");
const crearFitxerAlumne = (nom = no_Name, hores = 0) => {
  console.log("=================================".red);
  console.log("Creant fitxer de l'alumne " + nom);
  console.log("=================================".red);
  let sortida = "";
  sortida = "el nom es " + `${nom} +" i té " ${hores}`;
  fs.writeFileSync(`alumne${nom}.txt`, sortida);
  //el "+= es para acumular"
};

crearFitxerAlumne;
module.exports = {
  crearFitxerAlumne,
};

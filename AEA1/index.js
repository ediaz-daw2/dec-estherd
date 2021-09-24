console.clear();
const { crearFitxerAlumne } = require("./helpers/hores");
console.log(process.argv);
let hores = process.argv[3];
hores = hores.split("=")[1]; //sortida es un array
//console.log(hores);
//--------------
let nom = process.argv[2];
nom = nom.split("=")[1]; //sortida es un array
//console.log(nom);
//const nom = "Andrea"; //constante no cambia el valor
//const hores = 100;
crearFitxerAlumne(nom, hores);

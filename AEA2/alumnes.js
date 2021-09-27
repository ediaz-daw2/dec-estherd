require("colors");
const argv = require('./config/yargs2').argv;
const {llistarAlumne,crearFitxer}=require('./helper/hores');


//console.log(argv);
//para meter un parametro "node app.js --a=2"
//para meter dentro del array "node app.js a=2"
console.clear();
console.log(argv);
let param = argv._[0]; //guarfar el primer parametro de yargs en una variable
//console.log(param);

switch(param){
    case 'llistar':
        llistarAlumne(argv.nom,argv.hores);
        //console.log('Llisto la taula de multiplicar');
        break;
    case 'crear':
        crearFitxer(argv.nom,argv.hores);
        //console.log('creo un nou fitxer');
        break;
    default:
        console.log("No s'ha reconegut la comanda");
}
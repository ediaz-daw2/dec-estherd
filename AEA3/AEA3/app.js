require("colors");

const {
  inquirerMenu,
  pausa,
  nouAlumne,
  alumneSelect,
  introHores,
  confirmar
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const AlumnesHores = require("./models/alumneshores");
const Alumne = require("./models/alumne");

const main = async () => {
  let opt = "";
  const alumnes = new AlumnesHores();

  const alumnesDB = readDB();

  if (alumnesDB) {
    // si hi ha dades, carrégales
    alumnes.carregarAlumnesFromArray(alumnesDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nomAlumne = await nouAlumne("Nom alumne:");
        alumnes.crearAlumne(nomAlumne, 0);
        // const alumne = new Alumne("Ricard", 10);
        // console.log(alumne);
        break;

      case "2":
        alumnes.llistarAlumnes();
        break;

      case "3":
        alumnes.llistarAlumnesHores();
        break;

      case "4":

        const id1 = await alumneSelect(alumnes.llistatArr);

        if (id1!=='0'){
          const hores = await introHores("Introdueix les hores:");
          const nomAlumne = await alumnes.introNumHores(id1,hores);
          console.log(`Alumne: ${nomAlumne} ${'::'.yellow} ${hores} hores guardades`);
          //id1.crearHora(hores, 0);

        }

        //console.log(id1);

        break;

      case "5":
        //Utilitzar el delete
        //eliminar alumne de la base de dades i funció de confirmació

        const id2 = await alumneSelect(alumnes.llistatArr);
        if (id2!=='0'){
          const ok = await confirmar("Estás segur de que vols eliminar?")
          
          if(ok){
            alumnes.eliminarAlumne(id2);
            console.log('Alumne eliminat!');
          }else{
          console.log("no s'ha pogut eliminar");
          }
        }

        break;

      default:
        break;
    }

    guardarDB(alumnes.llistatArr);

    await pausa();
  } while (opt !== "0");
};

main();


//PROYECTO

/**
 * 1. Crear una aplicació amb INQUIRER que permeti crear llistes de coses per a fer amb la opció de poderles marcar com fetes o pendents... ensenyar exemple classe.
 * 
 * 2. Crear una aplicació amb INQUIRER que permeti la reserva de seients d'una sala de cine...
 * 
 */
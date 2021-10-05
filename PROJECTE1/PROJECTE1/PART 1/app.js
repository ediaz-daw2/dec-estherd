require("colors");
const {
  inquirerMenu,
  pausa,
  novaTasca,
  tascaSelect2,
  selectPendents,
  confirmar,
  opcions
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const Tasques = require("./models/tasques");
const Tasca = require("./models/tasca");

const main = async () => {
  let opt = "";
  const tasques = new Tasques();

  const tasquesDB = readDB();

  if (tasquesDB) {
    // si hi ha dades, carrégales
    tasques.carregarTasquesFromArray(tasquesDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nomTasca = await novaTasca("Nom de la nova tasca:");
        tasques.crearTasca(nomTasca, 0);
        // const tasca = new tasca("Ricard", 10);
        // console.log(tasca);
        break;

      case "2":
        //Llistar tasques
        tasques.llistarTasques();
        break;

      case "3":
        //Llistar tasques completes
        tasques.llistarTasquesCompletes();
        break;

      case "4":
        //Llistar tasques pendents
        tasques.llistarTasquesPendents();
        break;

      case "5":
        //Completar tasques
        
        const opci= await opcions(tasques.llistatArr);
        tasques.completarTasca(opci);
        
        /* const id4 = await tascaSelect2(tasques.llistatArr);
        if (id4!=='0'){
            tasques.completarTasca(id4);
            console.log('Tasca completa!'.green);
          }else{
          console.log("no s'ha marcat com a completada la tasca".red);
          }
        //console.log(id1); */

        break;

      case "6":
        //Eliminar tasca
        //Utilitzar el delete
        //eliminar tasca de la base de dades i funció de confirmació

        const id2 = await tascaSelect2(tasques.llistatArr);
        if (id2!=='0'){
          const ok = await confirmar("Estás segur de que vols eliminar?")
          
          if(ok){
            tasques.eliminarTasca(id2);
            console.log('Tasca eliminada correctament!');
          }else{
          console.log("no s'ha pogut eliminar");
          }
        }

        break;

      default:
        break;
    }

    guardarDB(tasques.llistatArr);

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
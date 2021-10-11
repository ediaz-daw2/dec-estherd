require("colors");
const {
  inquirerMenu,
  pausa,
  novaReservaFila,
  novaReservaColumna,
  reservaSelect2,
  confirmar,
  contar
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const Reserves = require("./models/reserves");
const Reserva = require("./models/reserva");

const main = async () => {
  let opt = "";
  const reserves = new Reserves();

  const reservesDB = readDB();

  if (reservesDB) {
    // si hi ha dades, carrégales
    reserves.carregarReservesFromArray(reservesDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nouReservafil = await novaReservaFila("Escull fila:");
        const nouReservacol = await novaReservaColumna("Escull columna:");
        console.log("Has escollit la fila "+nouReservafil+" y la columna "+nouReservacol);
        reserves.crearReserva(nouReservafil, nouReservacol);
        break;

      case "2":
        //Llistar reserves
        reserves.llistarReserves(reserves);
        break;

      case "3":
        //MOSTRAR RECAUDACIÓ
        const opci= await contar(reserves.llistatArr);
        console.log(`S'han recaudat: ` +`${opci}€`.yellow +` en total.`);
        
        /* const id4 = await tascaSelect2(tasques.llistatArr);
        if (id4!=='0'){
            tasques.completarTasca(id4);
            console.log('Tasca completa!'.green);
          }else{
          console.log("no s'ha marcat com a completada la tasca".red);
          }
        //console.log(id1); */

        break;

      case "4":
        //Eliminar tasca
        //Utilitzar el delete
        //eliminar tasca de la base de dades i funció de confirmació

        const id2 = await reservaSelect2(reserves.llistatArr);
        if (id2!=='0'){
          const ok = await confirmar("Estás segur de que vols eliminar la tasca?")
          
          if(ok){
            reserves.eliminarReserva(id2);
            console.log('Reserva eliminada correctament!');
          }else{
          console.log("no s'ha pogut eliminar la reserva");
          }
        }

        break;

      default:
        break;
    }

    guardarDB(reserves.llistatArr);

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
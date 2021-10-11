const Reserva = require("./reserva");

/**
 * _llista :
 *  { uuid-234235324-234234523: {id: uuid-234235324-234234523, nom: 'pepito', hores: 10 }}
 */

class Reserves {
  _llista = {
    abc: 123,
  };

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const reserva = this._llista[key];
      llistat.push(reserva);
    });

    return llistat;
  }

  constructor() {
    this._llista = {};
  }

  crearReserva(reserves = [],fila = "", columna="") {
    if ( fila>=6 || columna>=6){
      console.log("Però no existeix aquest seient!!!".red);
    }else{
    const reserva = new Reserva(fila, columna);
    this._llista[reserva.id] = reserva;
      console.log("Seient reservat corractament!".green);
    }
  }


  carregarReservesFromArray(reserves = []) {
    reserves.forEach((reserva) => {
      this._llista[reserva.id] = reserva;
    });
  }

  carregarReservesFromArraySelec(reserves = []) {
    reserves.forEach((reserva) => {
      this._llista[reserva.id] = reserva;
    });
  }

//  llistarTasques() {
//    console.log(); // sóc un salt de línia
//    let conta = 0;
    //la condicio ternaria resol el if en una sola linea utilitzant 
//    this.llistatArr.forEach((tasca) => {
//      const { nom } = tasca;
//      conta += 1;
//      console.log(`${(conta + ".").green} ${nom}`);
//    });
//
//  }


  llistarReserves() {
    var fi1 = [""];
    var fi2 = [""];
    var fi3 = [""];
    var fi4 = [""];
    var fi5 = [""];
    var fi6 = [""];
    var fi7 = [""];
    var fi8 = [""];

//Introducir

  for (let but = 1; but < 9; but++) {
    fi1[but]="■ ".green;
    fi2[but]="■ ".green;
    fi3[but]="■ ".green;
    fi4[but]="■ ".green;
    fi5[but]="■ ".green;
    fi6[but]="■ ".green;
  };

    for (let but = 1; but < 9; but++) {
      this.llistatArr.forEach((reserves) => {
       const { fila, columna } = reserves;
  
      if (fila == "1" && but == columna) {
      fi1[but]="■ ".red;
     }else if (fila == "2" && but == columna) {
      fi2[but]="■ ".red;
     }else if (fila == "3" && but == columna) {
      fi3[but]="■ ".red;
     }else if (fila == "4" && but == columna) {
      fi4[but]="■ ".red;
     }else if (fila == "5" && but == columna) {
      fi5[but]="■ ".red;
     }else if (fila == "6" && but == columna) {
      fi6[but]="■ ".red;
     }
  
    });
  }
  
  //Mostrar
  console.log("")
  console.log("-----------")
  console.log("")
  
  for (let fi = 0; fi < 7; fi++) {
    process.stdout.write(fi1[fi]); 
  
  };
  console.log("");
  for (let fi = 0; fi < 7; fi++) {
   
    process.stdout.write(fi2[fi]); 
  
  };
  console.log("");
  for (let fi = 0; fi < 7; fi++) {
  
    process.stdout.write(fi3[fi]);
  
  };
  console.log("");
  for (let fi = 0; fi < 7; fi++) {
  
    process.stdout.write(fi4[fi]);
  
  };
  console.log("");
  for (let fi = 0; fi < 7; fi++) {
  
    process.stdout.write(fi5[fi]);
  };
  console.log("");
  for (let fi = 0; fi < 7; fi++) {
  
    process.stdout.write(fi6[fi]);
  
  };
  console.log("");
  console.log("");
  console.log("--/--------");
  
};

  
    /* this.llistatArr.forEach((reserva) => {
      const { fila, columna } = reserva;
  
      conta += 1;
      console.log(
        `${(conta + ".").green} ${"Fila:".yellow} ${(fila + "").cyan} ${"::".green} ${(columna + "").cyan}`
      ); */



  async completarReserva(id) {
    console.log(id);
    for (let i = 0; i < id.length; i++) {
      const reserva = this._llista[id[i]];
      if (reserva.fila!=0 && reserva.columna!=0){
        reserva.fila=0;
        reserva.columna=0;
        console.log(reserva);
      }else{
      reserva.fila=1;
      reserva.columna=1;
      }
    }



    //tasca.pendent=1;
    /*const reserva = this._llista[id];
    if (id.pendent!=0){
      tasca.pendent=0;
    }else{
    tasca.pendent=0;
    //console.log(tasca); */
  }
  async calcular(id){
    console.log(id);
    total=0;
    dinero=8;
    for (let i = 0; i < id.length; i++) {
      total++;
      total=total+dinero;
    }
    return total;
  }
  /*}*/

  async eliminarReserva(id){
    delete this._llista[id];
  }
}


module.exports = Reserves;

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

  crearReserva(fila = "", columna="") {
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
    this.llistatArr.forEach((reserva) => {
    const { fila, columna } = reserva;
    console.log();
    let conta = 0;
    let arr_seients=[5][5];

    for (let i = 0; i <=5; i++) {
      for (let h = 0; h <=5; h++) {
        if(fila==h){
          arr_seients[i][h]=fila;
          console.log(arr_seients);
        }
      }
      if(columna==i){
        arr_seients[i][h]=columna;
        console.log(arr_seients);
      }
      
    }
  
    /* this.llistatArr.forEach((reserva) => {
      const { fila, columna } = reserva;
  
      conta += 1;
      console.log(
        `${(conta + ".").green} ${"Fila:".yellow} ${(fila + "").cyan} ${"::".green} ${(columna + "").cyan}`
      ); */
    });
  }


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

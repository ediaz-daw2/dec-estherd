const { v4: uuidv4 } = require("uuid");

class Reserva {
  id = "";
  fila = "";
  columna = "";

  constructor(fila, columna) {
    this.id = uuidv4();
    this.fila = fila;
    this.columna = columna;
  }
}

module.exports = Reserva;

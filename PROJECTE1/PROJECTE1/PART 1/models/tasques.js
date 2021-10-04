const Tasca = require("./tasca");

/**
 * _llista :
 *  { uuid-234235324-234234523: {id: uuid-234235324-234234523, nom: 'pepito', hores: 10 }}
 */

class Tasques {
  _llista = {
    abc: 123,
  };

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const tasca = this._llista[key];
      llistat.push(tasca);
    });

    return llistat;
  }

  constructor() {
    this._llista = {};
  }

  crearTasca(nom = "", pendent=0) {
    const tasca = new Tasca(nom, pendent);
    this._llista[tasca.id] = tasca;
  }

  canviarTasca(nom = "", pendent=1) {
    nom.pendent=1
    this._llista[nom.id] = nom;
  }


  carregarTasquesFromArray(tasques = []) {
    tasques.forEach((tasca) => {
      this._llista[tasca.id] = tasca;
    });
  }

  carregarTasquesFromArraySelec(tasques = []) {
    tasques.forEach((tasca) => {
      this._llista[tasca.id] = tasca;
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
llistarTasquesCompletes() {
  console.log();
  let conta = 0;

  this.llistatArr.forEach((tasca) => {
    const { nom, pendent } = tasca;

    const pend =
      pendent > 0 ? "Completada".green : "pendent".red;

      if(tasca.pendent!=0){
      conta += 1;
      console.log(
        `${(conta + ".").green} ${"Nom tasca:".yellow} ${(nom + "").cyan} ${
          "::".green
        } ${pend}`
      );
    }
  });
}


llistarTasquesPendents() {
  console.log();
  let conta = 0;

  this.llistatArr.forEach((tasca) => {
    const { nom, pendent } = tasca;

    const pend =
      pendent > 0 ? "Completada".green : "pendent".red;

      if(tasca.pendent==0){
      conta += 1;
      console.log(
        `${(conta + ".").green} ${"Nom tasca:".yellow} ${(nom + "").cyan} ${
          "::".green
        } ${pend}`
      );
    }
  });
}

  llistarTasques() {
    console.log();
    let conta = 0;
  
    this.llistatArr.forEach((tasca) => {
      const { nom, pendent } = tasca;
  
      const pend =
        pendent > 0 ? "Completada".green : "pendent".red;

      conta += 1;
      console.log(
        `${(conta + ".").green} ${"Nom tasca:".yellow} ${(nom + "").cyan} ${
          "::".green
        } ${pend}`
      );
    });
  }


  async completarTasca(id,pend) {
    console.log(id.length);
    for (let i = 0; i <= id.length; i++) {
      const tasca = this._llista[id[i]];
      tasca.pendent=1;
    }
    return tasca;

    //tasca.pendent=1;
    /*const tasca = this._llista[id];
    if (id.pendent!=0){
      tasca.pendent=0;
    }else{
    tasca.pendent=0;
    //console.log(tasca); */
  }
  /*}*/
  async desmarcarTasca(id, pendent) {
    const tasca = this._llista[id];
    if (tasca.pendent==0){
      console.log("(Aquesta tasca ja estaba marcada com a pendent)".gray);
    }else{
    tasca.pendent=0;
    //console.log(tasca);
    return tasca.nom;
    }
  }

  async eliminarTasca(id){
    delete this._llista[id];
  }
}


module.exports = Tasques;

const inquirer = require("inquirer");


require("colors");


const preguntes = [
  {
    type: "list",
    name: "opcio",
    message: "Què vols fer?",
    choices: [
      {
        value: "1",
        name: `${"1 ".green} Nova reserva`,
      },
      {
        value: "2",
        name: `${"2 ".green} Mostra sala`,
      },
      {
        value: "3",
        name: `${"3 ".green} Mostrar recaudació`,
      },
      {
        value: "4",
        name: `${"4 ".green} Eliminar reserva`,
      },
      {
        value: "0",
        name: `${"0 ".green} Sortir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("====== CINEMA NEMA ======".yellow);
  console.log("   Selecciona una opció   ".green);
  console.log("=========================\n".yellow);

  const { opcio } = await inquirer.prompt(preguntes);

  return opcio; // retorno un valor entre 0 i 5
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presiona ${"enter".yellow} per a continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const novaReservaFila = async (message) => {
  const question = [
    {
      type: "input",
      name: "fila",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Quina fila?: ";
        }
        return true;
      },
    },
  ];

  const { fila } = await inquirer.prompt(question);
  return fila;
};

const novaReservaColumna = async (message) => {
  const question = [
    {
      type: "input",
      name: "columna",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Quina columna?: ";
        }
        return true;
      },
    },
  ];

  const { columna } = await inquirer.prompt(question);
  return columna;
};

const selectPendents = async (message) => {
  const question = [
    {
      type: "input",
      name: "pendents",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Si us plau, introdueix les pendents";
        }
        return true;
      },
    },
  ];

  const { hores } = await inquirer.prompt(question);
  return hores;
};


/* const tascaSelect = async (tasques = []) => {
  const choices = tasques.map((tasca, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tasca.id,
      name: `${idx} ${tasca.nom}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Selecciona tasca",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
}; */

const reservaSelect2 = async (reserves = []) => {
  const choices = reserves.map((reserva, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: reserva.id,
      name: `${idx} ${reserva.fila} :: ${reserva.columna}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Selecciona tasca",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};


const confirmar = async(message) => {
  
  const question=[
    {
      type:'confirm',
      name: 'ok',
      message
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};


const contar=async (tasques=[]) => {
  let total= 1;
  const cuenta = tasques.map((tasca, i) => {
    return {
      value: tasca.id,
      name: `${tasca.fila} :: ${tasca.columna} `,
    };
  });
  for (let a = 1; a <= cuenta.length; a++) {
    total=a*8;
  }
  console.log("Hi han reservats ".gray+total/8+" seients. Per tant...".gray);
  return total;
}

/* const opcions = async (tasques=[]) => {
  
  const choices = tasques.map((tasca, i) => {
    const idx = `${i + 1}.`.green;
    const pen = `${tasca.pendent}` > 0 ? "Completada".green : "pendent".red;
    return {
      value: tasca.id,
      name: `${idx} ${tasca.nom} :: `+pen.gray,
    };
  });
  const check=[
    {
      type:'checkbox',
      name: 'ids',
      message: 'Escull les tasques que vols completar',
      choices 
    },
  ];

  const {ids}= await inquirer.prompt(check);
  
  return ids;
}
/*

//CHECK

/*const opcions =(async () => {
  let answer;

  answer = await checkbox({
    message: 'Select a package manager',
    choices: [
      { name: 'npm', value: 'npm' },
      { name: 'yarn', value: 'yarn' },
      { name: 'jspm', value: 'jspm', disabled: true },
    ],
  });
  console.log('Answer:', answer);

  answer = await checkbox({
    message: 'Select your favorite letters',
    choices: [
      { value: 'A' },
      { value: 'B' },
      { value: 'C' },
      { value: 'D' },
      { value: 'E' },
      { value: 'F' },
      { value: 'G' },
      { value: 'H' },
      { value: 'I' },
      { value: 'J' },
      { value: 'K' },
      { value: 'L' },
      { value: 'M' },
      { value: 'N' },
      { value: 'O' },
      { value: 'P' },
      { value: 'Q' },
      { value: 'R' },
      { value: 'S' },
      { value: 'T' },
      { value: 'U' },
      { value: 'V' },
      { value: 'W' },
      { value: 'X' },
      { value: 'Y' },
      { value: 'Z' },
    ],
  });
  console.log('Answer:', answer);
})();

*/



module.exports = {
  inquirerMenu,
  pausa,
  novaReservaFila,
  novaReservaColumna,
  reservaSelect2,
  selectPendents,
  confirmar,
  contar
};

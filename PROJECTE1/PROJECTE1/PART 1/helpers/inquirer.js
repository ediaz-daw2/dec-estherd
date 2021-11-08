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
        name: `${"1 ".green} Nova tasca`,
      },
      {
        value: "2",
        name: `${"2 ".green} Llistar tasques`,
      },
      {
        value: "3",
        name: `${"3 ".green} Llistar tasques completes`,
      },
      {
        value: "4",
        name: `${"4 ".green} Llistar tasques pendents`,
      },
      {
        value: "5",
        name: `${"5 ".green} Completar tasques`,
      },
      {
        value: "6",
        name: `${"6 ".green} Eliminar tasca`,
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
  console.log("========================".yellow);
  console.log("ADMINISTRACIÓ DE TASQUES".green);
  console.log("========================\n".yellow);

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

const novaTasca = async (message) => {
  const question = [
    {
      type: "input",
      name: "nom",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Introdueix la nova tasca: ";
        }
        return true;
      },
    },
  ];

  const { nom } = await inquirer.prompt(question);
  return nom;
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

const tascaSelect2 = async (tasques = []) => {
  const choices = tasques.map((tasca, i) => {
    const idx = `${i + 1}.`.green;
    const pen = `${tasca.pendent}` > 0 ? "Completada".green : "pendent".red;
    return {
      value: tasca.id,
      name: `${idx} ${tasca.nom} :: `+pen.gray,
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



const opcions = async (tasques=[]) => {
  
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
  novaTasca,
  tascaSelect2,
  selectPendents,
  confirmar,
  opcions
};

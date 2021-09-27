require('colors');
const { rejects } = require('assert');
const fs =require('fs'); //requerir el file system
let a= colorString.get.rgb('blue')

const llistarAlumne=(nom="no_name", hores=0)=> {
    console.log('==========='.green);
    console.log(`El nom del alumne es ${nom} i té ${hores} hores fetes`.yellow);
    console.log('==========='.green);
}

const crearFitxer=(nom="no_name", hores=0)=> {
    if (!String(nom)){
        console.log('El valor de nom ha de ser un String');
        return;
    }
    if (!Number(hores)){
        console.log('El valor de hores ha de ser un Numero');
        return;
    }
    let data='';
        data = `L'alumne ${nom} té ${hores} fetes.`;
        console.log("=================================".red);
        console.log(`Creant fitxer de l'alumne ${nom}`);
        console.log("=================================".red);
        fs.writeFileSync(`Alumne_${nom}.txt`.colorString("blue"), data,(err) =>{
            if(err) throw Error(err);
            else console.log('a');
        });
        //el "+= es para acumular"
}
module.exports={
    llistarAlumne,
    crearFitxer
}
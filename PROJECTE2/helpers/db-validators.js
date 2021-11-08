const Usuari= require('../models/usuari');
const emailExisteix = async(correu = "") => {
    //Verificar si el correu ja existeix a la bd
    const existeix = await Usuari.findOne({correu});
    if (existeix){
        throw new Error(`El correu ${correu} ja està registrat.`);
    }

};
module.exports ={
    emailExisteix
}
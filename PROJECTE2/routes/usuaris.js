const { Router } = require("express");
const { response, request } = require("express");
const {check,validationResult} =require('express-validator');
const { usuarisGet,usuarisPost } = require('../controllers/usuaris');
const router = Router();
const {emailExisteix} = require('../helpers/db-validators')

const validarCaps=(req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/usuaris", usuarisGet);

router.post('/usuaris',
[
  check("correu","El correu no és vàlid").isEmail(),
  check("correu").custom(emailExisteix), //el paràmetre s'envía autormàticament
  check("nom","El nom és obligatori").not().isEmpty(),
  check("password","El password ha de tenir més de 6 caràcters").isLength({
    min: 6
  }),
  validarCaps
],
usuarisPost)

/*
router.get("/clients", (req = request, res = response) => {
  res.json({
    msg: "Llista de clients",
    ok: true,
  });
});

module.exports = router;
*/



//ACTIVITATS:
  // USUARIS
// router.put :id //update d'un determinat usuari
// router.delete :id //eliminar un usuari determnat

// Fer lo mateix amb clients. (model client ha de tenir 7 camps mínim)
// Només el GET de 'serveis' --> (model servei ha de tenir com a mínim 5 camps)

// !!! Tot es puja a GitHub !!!

// De forma ordenada, mostrar totes les captures de POSTMAN on es vegi que funcionen tots els mètodes
 // ====== El punt 4 s'entrega a Heroku =======
 
const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");

const { usuarisGet, usuarisPost } = require("../controllers/usuaris");
const { clientsGet, clientsPost } = require("../controllers/clients");
const { serveisGet, serveisPost } = require("../controllers/serveis");



const { emailExisteix } = require("../helpers/db-validators");

const router = Router();

const validarCamps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("<h1>USUARIS</h1><a href='/api/usuaris'>get usuaris</a><h1>CLIENTS</h1><a href='/api/clients'>get clients</a><h1>SERVEIS</h1><a href='/api/serveis'>get serveis</a>");
});

// === USUARIS ===

router.get("/usuaris", usuarisGet);

router.post(
  "/usuaris",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    check("correu").custom(emailExisteix),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),

    validarCamps,
  ],
  usuarisPost
);





// === CLIENTS ===

router.get("/clients", clientsGet);

router.post(
  "/clients",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    check("correu").custom(emailExisteix),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),

    validarCamps,
  ],
  clientsPost
);



// === SERVEIS ===


router.get("/serveis", serveisGet);

router.post(
  "/serveis",
  serveisPost
);


// router.put /:id //update d'un determinat usuari
// router.delete /:id //eliminar un usuari determinat

module.exports = router;


const { Router } = require("express");
const { response, request } = require("express");

const router = Router();

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/usuaris", (req = request, res = response) => {
  res.json({
    msg: "Llista de usuaris",
    ok: true,
  });
});

router.get("/clients", (req = request, res = response) => {
  res.json({
    msg: "Llista de clients",
    ok: true,
  });
});

module.exports = router;
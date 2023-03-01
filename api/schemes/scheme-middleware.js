const db = require("./scheme-model");
const dbConfig = require("../../data/db-config");

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  const aray = await db.ıdCheck();
  const check = aray.find((i) => i.scheme_id == scheme_id);
  if (check) {
    next();
  } else return res.status(400).json({ message: "NOT FIND SCHEMEID" });
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  console.log(scheme_name);
  if (!scheme_name || scheme_name === "" || typeof scheme_name === "number") {
    return res.status(400).json({ message: "NAME HATASI" });
  } else {
    next();
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    !instructions ||
    !step_number ||
    typeof step_number === "string" ||
    step_number < 1
  ) {
    return res.status(400).json({ message: "ERROR" });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};

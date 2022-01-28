const db = require("../db/index");

async function getPotvrdaRezervacije(req, res, next) {
  try {
    const result = await db.query(
      `select pz.*, r.ime_prezime from potvrda_rezervacije pz
    join radnik r on pz.sifra_radnika = r.sifra_radnika`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addPotvrdaRezervacije(req, res, next) {
  try {
    const result = await db.query(
      `insert into potvrda_rezervacije(opis, sifra_radnika)
      values ($1, $2)`,
      [req.body.opis, req.body.sifra_radnika]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updatePotvrdaRezervacije(req, res, next) {
  try {
    const result = await db.query(
      `update potvrda_rezervacije
      set opis = $1, sifra_radnika=$2
      where id_potvrde = $3`,
      [req.body.opis, req.body.sifra_radnika, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deletePotvrdaRezervacije(req, res, next) {
  try {
    const result = await db.query(
      "delete from potvrda_rezervacije where id_potvrde = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPotvrdaRezervacije,
  addPotvrdaRezervacije,
  updatePotvrdaRezervacije,
  deletePotvrdaRezervacije,
};

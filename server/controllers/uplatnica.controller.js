const db = require("../db/index");

async function getUplatnica(req, res, next) {
  try {
    const result = await db.query(
      `select u.*, r.ime_prezime as radnik, v.naziv_valute, m.opis_modela, k.ime_prezime as korisnik 
      from uplatnica u
      join profaktura_prevoznika pp on u.br_profakture = pp.br_profakture
      join radnik r on u.sifra_radnika = r.sifra_radnika
      join valuta v on u.id_valute = v.id_valute
      join model m on u.id_modela = m.id_modela
      join korisnik k on u.jmbg = k.jmbg`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleUplatnica(req, res, next) {
  try {
    const result = await db.query(
      `select * from uplatnica where id_uplatnice = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addUplatnica(req, res, next) {
  console.log(req.body)
  try {
    const result = await db.query(
      `insert into uplatnica
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        req.body.id_uplatnice,
        req.body.iznos,
        req.body.svrha_uplate,
        req.body.br_racuna,
        req.body.br_profakture,
        req.body.sifra_radnika,
        req.body.id_valute,
        req.body.id_modela,
        req.body.jmbg,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateUplatnica(req, res, next) {
  try {
    const result = await db.query(
      `update uplatnica
      set iznos = $1, svrha_uplate=$2, br_racuna = $3,
      br_profakture = $4, sifra_radnika = $5, id_valute=$6, id_modela = $7,
      jmbg = $8 where id_uplatnice = $9`,
      [
        req.body.iznos,
        req.body.svrha_uplate,
        req.body.br_racuna,
        req.body.br_profakture,
        req.body.sifra_radnika,
        req.body.id_valute,
        req.body.id_modela,
        req.body.jmbg,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteUplatnica(req, res, next) {
  try {
    const result = await db.query(
      "delete from uplatnica where id_uplatnice =$1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUplatnica,
  addUplatnica,
  updateUplatnica,
  deleteUplatnica,
  getSingleUplatnica
};

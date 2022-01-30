const db = require("../db/index");

async function getKorisnik(req, res, next) {
  try {
    const result = await db.query(
      `select k.*, a.ulica, a.broj, g.naziv_grada, d.naziv_drzave from korisnik k
    join adresa a on k.id_adrese = a.id_adrese
    join grad g on a.id_grada = g.id_grada
    join drzava d on g.id_drzave = d.id_drzave`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleKorisnik(req, res, next) {
  try {
    const result = await db.query(
      `select k.*, a.ulica, a.broj, g.naziv_grada, d.naziv_drzave from korisnik k
    join adresa a on k.id_adrese = a.id_adrese
    join grad g on a.id_grada = g.id_grada
    join drzava d on g.id_drzave = d.id_drzave where jmbg = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addKorisnik(req, res, next) {
  try {
    const result = await db.query(
      `insert into korisnik
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        req.body.jmbg,
        req.body.ime_prezime,
        req.body.datum_rodj,
        req.body.br_pasos,
        req.body.br_telefona,
        req.body.sifra_programa,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.id_adrese,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateKorisnik(req, res, next) {
  try {
    const result = await db.query(
      `update korisnik set
      ime_prezime = $1, datum_rodj = $2, br_pasos = $3,
      br_telefona = $4, sifra_programa = $5, id_grada = $6, id_drzave = $7, id_adrese = $8
      where jmbg = $9`,
      [
        req.body.ime_prezime,
        req.body.datum_rodj,
        req.body.br_pasos,
        req.body.br_telefona,
        req.body.sifra_programa,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.id_adrese,
        req.body.jmbg,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteKorisnik(req, res, next) {
  try {
    const result = await db.query("delete from korisnik where jmbg=$1", [
      req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = { getKorisnik, addKorisnik, updateKorisnik, deleteKorisnik, getSingleKorisnik };

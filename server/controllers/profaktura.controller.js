const db = require("../db/index");

async function getProfaktura(req, res, next) {
  try {
    const result = await db.query(
      `select pp.*, g.naziv_grada, d.naziv_drzave, olp.ime_prezime as zaposleni, pr.naziv as prevoznik, np.opis_nacina
    from profaktura_prevoznika pp
    join grad g on pp.id_grada = g.id_grada
    join drzava d on pp.id_drzave = d.id_drzave
    join ovlaceno_lice_prevoznika olp on pp.sifra = olp.sifra
    join prevoznik pr on pp.id_prevoznika = pr.id_prevoznika
    join nacin_placanja np on pp.id_nacina = np.id_nacina`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addProfaktura(req, res, next) {
  try {
    const result = await db.query(
      `insert into profaktura_prevoznika
      values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        req.body.br_profakture,
        req.body.iznos,
        req.body.datum_prometa,
        req.body.datum_izdavanja,
        req.body.poziv_na_broj,
        req.body.br_ugovora,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.id_nacina,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateProfaktura(req, res, next) {
  try {
    const result = await db.query(
      `update profaktura_prevoznika
      set iznos = $1, datum_prometa = $2, datum_izdavanja = $3,
      poziv_na_broj = $4, br_ugovora = $5, id_grada = $6, id_drzave = $7,
      id_prevoznika = $8, id_nacina = $9
      where br_profakture = $10`,
      [
        req.body.iznos,
        req.body.datum_prometa,
        req.body.datum_izdavanja,
        req.body.poziv_na_broj,
        req.body.br_ugovora,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.id_nacina,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteProfaktura(req, res, next) {
  try {
    const result = await db.query(
      "delete from profaktura_prevoznika where br_profakture = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfaktura,
  addProfaktura,
  updateProfaktura,
  deleteProfaktura,
};

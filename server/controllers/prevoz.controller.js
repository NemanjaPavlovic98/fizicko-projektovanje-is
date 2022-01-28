const db = require("../db/index");

// TIP PREVOZA

async function getTipPrevoza(req, res, next) {
  try {
    const result = await db.query("select * from tip_prevoza", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addTipPrevoza(req, res, next) {
  try {
    const result = await db.query(
      "insert into tip_prevoza(naziv_tipa_prevoza) values ($1)",
      [req.body.naziv_tipa_prevoza]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateTipPrevoza(req, res, next) {
  try {
    const result = await db.query(
      "update tip_prevoza set naziv_tipa_prevoza = $1 where id_tip_prevoza = $2",
      [req.body.naziv_tipa_prevoza, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteTipPrevoza(req, res, next) {
  try {
    const result = await db.query(
      "delete from tip_prevoza where id_tip_prevoza = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

// PREVOZNIK

async function getPrevoznik(req, res, next) {
  try {
    const result = await db.query(
      `select p.*, d.naziv_drzave, g.naziv_grada, a.ulica, a.broj
      from prevoznik p
      join adresa a on p.id_adrese = a.id_adrese
      join grad g on a.id_grada = g.id_grada
      join drzava d on g.id_drzave = d.id_drzave`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSinglePrevoznik(req, res, next) {
  try {
    const result = await db.query(
      `select * from prevoznik where id_prevoznika = $1`,
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addPrevoznik(req, res, next) {
  try {
    const result = await db.query(
      `insert into prevoznik(br_telefona, br_tekuceg, naziv, id_drzave, id_adrese, id_grada)
      values ($1, $2, $3, $4, $5, $6)`,
      [
        req.body.br_telefona,
        req.body.br_tekuceg,
        req.body.naziv,
        req.body.id_drzave,
        req.body.id_adrese,
        req.body.id_grada,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updatePrevoznik(req, res, next) {
  try {
    const result = await db.query(
      `update prevoznik set
    br_telefona = $1, br_tekuceg = $2, naziv = $3, 
    id_drzave = $4, id_adrese = $5, id_grada = $6
    where id_prevoznika=$7`,
      [
        req.body.br_telefona,
        req.body.br_tekuceg,
        req.body.naziv,
        req.body.drzava,
        req.body.adresa,
        req.body.grad,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deletePrevoznik(req, res, next) {
  try {
    const result = await db.query(
      "delete from prevoznik where id_prevoznika = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

// OVLASCENO LICE

async function getOvlascenoLice(req, res, next) {
  try {
    const result = await db.query(
      `select o.*, p.naziv as naziv from ovlaceno_lice_prevoznika o
    join prevoznik p on o.id_prevoznika=p.id_prevoznika`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addOvlascenoLice(req, res, next) {
  try {
    const result = await db.query(
      `insert into ovlaceno_lice_prevoznika(id_prevoznika, ime_prezime)
      values($1, $2)`,
      [req.body.id_prevoznika, req.body.ime_prezime]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateOvlascenoLice(req, res, next) {
  try {
    console.log(req.body)
    const result = await db.query(
      `update ovlaceno_lice_prevoznika set
      id_prevoznika = $1, ime_prezime = $2
      where sifra= $3 and id_prevoznika = $4`,
      [
        req.body.id_prevoznika,
        req.body.ime_prezime,
        req.params.id,
        req.body.id_prevoznika_old,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteOvlascenoLice(req, res, next) {
  try {
    const result = await db.query(
      `delete from ovlaceno_lice_prevoznika
      where sifra=$1 and id_prevoznika = $2`,
      [req.params.id, req.body.id_prevoznika]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTipPrevoza,
  addTipPrevoza,
  updateTipPrevoza,
  deleteTipPrevoza,
  getPrevoznik,
  addPrevoznik,
  updatePrevoznik,
  deletePrevoznik,
  getSinglePrevoznik,
  getOvlascenoLice,
  addOvlascenoLice,
  updateOvlascenoLice,
  deleteOvlascenoLice,
};

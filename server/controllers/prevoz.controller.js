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
    let queryText = `select o.*, p.naziv as naziv from ovlaceno_lice_prevoznika o
    join prevoznik p on o.id_prevoznika=p.id_prevoznika`;
    if (req.query.prevoznik) {
      queryText += ` where o.id_prevoznika = ${req.query.prevoznik}`;
    }
    const result = await db.query(queryText, []);
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
    console.log(req.body);
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

// UGOVOR O PREVOZU

async function getUgovorPrevoz(req, res, next) {
  try {
    const result = await db.query(
      `select uop.*, d.naziv_drzave, olp.ime_prezime as ime_prezime_ovlascenog, p.naziv, r.ime_prezime as ime_prezime_radnika
      from ugovor_o_prevozu uop
      join drzava d on uop.id_drzave=d.id_drzave
      join ovlaceno_lice_prevoznika olp on uop.sifra=olp.sifra
      join prevoznik p on uop.id_prevoznika=p.id_prevoznika
      join radnik r on uop.sifra_radnika = r.sifra_radnika`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleUgovorPrevoz(req, res, next) {
  try {
    const result = await db.query(
      `select uop.*, d.naziv_drzave, olp.ime_prezime as ime_prezime_ovlascenog, p.naziv, r.ime_prezime as ime_prezime_radnika
      from ugovor_o_prevozu uop
      join drzava d on uop.id_drzave=d.id_drzave
      join ovlaceno_lice_prevoznika olp on uop.sifra=olp.sifra
      join prevoznik p on uop.id_prevoznika=p.id_prevoznika
      join radnik r on uop.sifra_radnika = r.sifra_radnika
      where broj_ugovora = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addUgovorPrevoz(req, res, next) {
  try {
    const result = await db.query(
      `insert into ugovor_o_prevozu (datum, id_drzave, sifra, id_prevoznika, sifra_radnika)
      values($1, $2, $3, $4, $5)`,
      [
        req.body.datum,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.sifra_radnika,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateUgovorPrevoz(req, res, next) {
  try {
    console.log(req.body);
    const result = await db.query(
      `update ugovor_o_prevozu set
      datum = $1, id_drzave=$2, sifra=$3, id_prevoznika=$4, sifra_radnika=$5
      where broj_ugovora = $6`,
      [
        req.body.datum,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.sifra_radnika,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteUgovorPrevoz(req, res, next) {
  try {
    const result = await db.query(
      `delete from ugovor_o_prevozu where broj_ugovora = $1`,
      [req.params.id]
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
  getUgovorPrevoz,
  getSingleUgovorPrevoz,
  addUgovorPrevoz,
  updateUgovorPrevoz,
  deleteUgovorPrevoz,
};

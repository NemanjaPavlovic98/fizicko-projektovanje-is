const db = require("../db/index");

async function getDrzava(req, res, next) {
  try {
    const result = await db.query("select * from drzava", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addDrzava(req, res, next) {
  try {
    const result = await db.query(
      "insert into drzava(naziv_drzave) values ($1)",
      [req.body.naziv_drzave]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateDrzava(req, res, next) {
  try {
    const result = await db.query(
      "update drzava set naziv_drzave = 'test' where id_drzave = $2",
      [req.body.naziv_drzave, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteDrzava(req, res, next) {
  try {
    const result = await db.query("delete from drzava where id_drzave = $1", [
      req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getGrad(req, res, next) {
  try {
    const result = await db.query("select * from grad", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addGrad(req, res, next) {
  try {
    const result = await db.query(
      "insert into grad(id_drzave, naziv_grada) values($1, $2)",
      [req.body.id_drzave, req.body.naziv_grada]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateGrad(req, res, next) {
  try {
    const result = await db.query(
      "update grad set naziv_grada = $1, id_drzave = $2 where id_grada=$3",
      [req.body.naziv_grada, req.body.id_drzave, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteGrad(req, res, next) {
  try {
    const result = await db.query(
      "delete from grad where id_grada = $1 and id_drzave = $2",
      [req.params.id, req.body.id_drzave]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getAdresa(req, res, next) {
  try {
    const result = await db.query("select * from adresa", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addAdresa(req, res, next) {
  try {
    const result = await db.query(
      "insert into adresa(id_drzave, id_grada, ulica, broj) values($1, $2, $3, $4)",
      [req.body.id_drzave, req.body.id_grada, req.body.ulica, req.body.broj]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateAdresa(req, res, next) {
  try {
    const result = await db.query(
      "update adresa set id_drzave = $1, id_grada = $2, ulica = $3, broj = $4 where id_adrese = $5",
      [
        req.body.id_drzave,
        req.body.id_grada,
        req.body.ulica,
        req.body.broj,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteAdresa(req, res, next) {
  try {
    const result = await db.query("delete from adresa where id_adrese = $1", [
      req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDrzava,
  addDrzava,
  updateDrzava,
  deleteDrzava,
  getGrad,
  addGrad,
  updateGrad,
  deleteGrad,
  getAdresa,
  addAdresa,
  updateAdresa,
  deleteAdresa,
};

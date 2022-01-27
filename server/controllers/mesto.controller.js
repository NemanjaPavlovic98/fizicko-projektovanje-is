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
      "update drzava set naziv_drzave = $1 where id_drzave = $2",
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
    let queryText = `select g.*, d.naziv_drzave from grad g join drzava d on g.id_drzave = d.id_drzave`;
    if (req.query.drzava) {
      queryText += ` WHERE g.id_drzave = ${req.query.drzava}`;
    }
    const result = await db.query(queryText, []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addGrad(req, res, next) {
  try {
    const result = await db.query(
      "insert into grad(id_drzave, naziv_grada) values($1, $2)",
      [req.body.drzava, req.body.naziv_grada]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateGrad(req, res, next) {
  try {
    const result = await db.query(
      "update grad set naziv_grada = $1, id_drzave = $2 where id_grada=$3 and id_drzave=$4",
      [
        req.body.naziv_grada,
        req.body.drzava,
        req.params.id,
        req.body.drzava_old,
      ]
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
      [req.params.id, req.body.drzava]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getAdresa(req, res, next) {
  try {
    console.log(req.query)
    let queryText = `select a.*, g.naziv_grada, d.naziv_drzave from adresa a
    join grad g on a.id_grada = g.id_grada
    join drzava d on g.id_drzave = d.id_drzave`;

    if (req.query.drzava) {
      queryText += ` WHERE g.id_drzave = ${req.query.drzava}`;
    }

    if (req.query.grad) {
      queryText += ` and g.id_grada = ${req.query.grad}`;
    }

    const result = await db.query(
      queryText,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addAdresa(req, res, next) {
  try {
    const result = await db.query(
      "insert into adresa(id_drzave, id_grada, ulica, broj) values($1, $2, $3, $4)",
      [req.body.drzava, req.body.grad, req.body.ulica, req.body.broj]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateAdresa(req, res, next) {
  try {
    console.log(req.body);
    const result = await db.query(
      `update adresa set id_drzave = $1, id_grada = $2, ulica = $3, broj = $4 
      where id_adrese = $5 and id_grada = $6 and id_drzave = $7`,
      [
        req.body.drzava,
        req.body.grad,
        req.body.ulica,
        req.body.broj,
        req.params.id,
        req.body.grad_old,
        req.body.drzava_old,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteAdresa(req, res, next) {
  try {
    console.log(req.body)
    const result = await db.query(
      "delete from adresa where id_adrese = $1 and id_grada = $2 and id_drzave = $3",
      [req.params.id, req.body.grad, req.body.drzava]
    );
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

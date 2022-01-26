const db = require("../db/index");

async function getValute(req, res, next) {
  try {
    const result = await db.query("select * from valuta", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addValuta(req, res, next) {
  try {
    const result = await db.query(
      "insert into valuta(naziv_valute) values ($1)",
      [req.body.naziv_valute]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateValuta(req, res, next) {
  try {
    const result = await db.query(
      "update valuta set naziv_valute = $1 where id_valute = $2",
      [req.body.naziv_valute, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteValuta(req, res, next) {
    try {
      const result = await db.query(
        "delete from valuta where id_valute = $1",
        [req.params.id]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }

module.exports = { getValute, addValuta, updateValuta, deleteValuta };

const db = require("../db/index");

async function getNacinPlacanja(req, res, next) {
  try {
    const result = await db.query("select * from nacin_placanja", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addNacinPlacanja(req, res, next) {
  try {
    const result = await db.query(
      "insert into nacin_placanja(opis_nacina) values ($1)",
      [req.body.opis_nacina]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateNacinPlacanja(req, res, next) {
  try {
    const result = await db.query(
      "update nacin_placanja set opis_nacina = $1 where id_nacina = $2",
      [req.body.opis_nacina, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteNacinPlacanja(req, res, next) {
  try {
    const result = await db.query(
      "delete from nacin_placanja where id_nacina = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNacinPlacanja,
  addNacinPlacanja,
  updateNacinPlacanja,
  deleteNacinPlacanja,
};

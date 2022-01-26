const db = require("../db/index");

async function getModeli(req, res, next) {
  try {
    const result = await db.query("select * from model", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addModel(req, res, next) {
  try {
    const result = await db.query(
      "insert into model(opis_modela) values ($1)",
      [req.body.opis_modela]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateModel(req, res, next) {
  try {
    const result = await db.query(
      "update model set opis_modela = $1 where id_modela = $2",
      [req.body.opis_modela, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteModel(req, res, next) {
  try {
    const result = await db.query("delete from model where id_modela = $1", [
      req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = { getModeli, addModel, updateModel, deleteModel };

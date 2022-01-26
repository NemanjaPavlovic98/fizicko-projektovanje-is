const db = require("../db/index");

async function getRadnici(req, res, next) {
  try {
    const result = await db.query("select * from radnik", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addRadnik(req, res, next) {
  try {
    const result = await db.query(
      "insert into radnik(ime_prezime) values ($1)",
      [req.body.ime_prezime]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateRadnik(req, res, next) {
  try {
    const result = await db.query(
      "update radnik set ime_prezime = $1 where sifra_radnika = $2",
      [req.body.ime_prezime, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteRadnik(req, res, next) {
    try {
      const result = await db.query(
        "delete from radnik where sifra_radnika = $1",
        [req.params.id]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }

module.exports = { getRadnici, addRadnik, updateRadnik, deleteRadnik };

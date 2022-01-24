const db = require("../db/index");

async function functionExample(req, res, next) {
  try {
    const result = await db.query(
      "",
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error)
  }
}

module.exports = { functionExample };

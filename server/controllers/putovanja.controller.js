const db = require("../db/index");

// PROGRAMI PUTOVANJA

async function getProgramiPutovanja(req, res, next) {
  try {
    const result = await db.query("select * from programi_putovanja", []);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addProgramiPutovanja(req, res, next) {
  try {
    const result = await db.query(
      "insert into programi_putovanja(datum_kreiranja, sablon_programa) values ($1, $2)",
      [req.body.datum_kreiranja, req.body.sablon_programa]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateProgramiPutovanja(req, res, next) {
  try {
    const result = await db.query(
      `update programi_putovanja set datum_kreiranja = $1, sablon_programa= $2
        where redni_broj_programa = $3`,
      [req.body.datum_kreiranja, req.body.sablon_programa, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteProgramiPutovanja(req, res, next) {
  try {
    const result = await db.query(
      "delete from programi_putovanja where redni_broj_programa = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

// PROGRAM PUTOVANJA

async function getProgramPutovanja(req, res, next) {
  try {
    const result = await db.query(
      `select p.*, r.opis, pp.sablon_programa from program_putovanja p
    join potvrda_rezervacije r on p.id_potvrde=r.id_potvrde
    join programi_putovanja pp on p.redni_broj_putovanja=pp.redni_broj_programa`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleProgramPutovanja(req, res, next) {
  try {
    const result = await db.query(
      `select p.*, r.opis, pp.sablon_programa from program_putovanja p
    join potvrda_rezervacije r on p.id_potvrde=r.id_potvrde
    join programi_putovanja pp on p.redni_broj_putovanja=pp.redni_broj_programa
    where p.sifra_programa = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addProgramPutovanja(req, res, next) {
  try {
    const result = await db.query(
      `insert into program_putovanja
      (ukljuceno_u_cenu, nije_ukljuceno_u_cenu, iznos, id_potvrde, redni_broj_putovanja)
      values($1, $2, $3, $4, $5)`,
      [
        req.body.ukljuceno_u_cenu,
        req.body.nije_ukljuceno_u_cenu,
        req.body.iznos,
        req.body.id_potvrde,
        req.body.redni_broj_putovanja,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateProgramPutovanja(req, res, next) {
  try {
    console.log(req.body);
    const result = await db.query(
      `update program_putovanja set
      ukljuceno_u_cenu = $1, nije_ukljuceno_u_cenu = $2,
      iznos=$3, id_potvrde = $4, redni_broj_putovanja = $5
      where sifra_programa = $6`,
      [
        req.body.ukljuceno_u_cenu,
        req.body.nije_ukljuceno_u_cenu,
        req.body.iznos,
        req.body.id_potvrde,
        req.body.redni_broj_putovanja,
        req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteProgramPutovanja(req, res, next) {
  try {
    const result = await db.query(
      "delete from program_putovanja where sifra_programa = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProgramiPutovanja,
  addProgramiPutovanja,
  updateProgramiPutovanja,
  deleteProgramiPutovanja,
  getProgramPutovanja,
  getSingleProgramPutovanja,
  addProgramPutovanja,
  updateProgramPutovanja,
  deleteProgramPutovanja,
};

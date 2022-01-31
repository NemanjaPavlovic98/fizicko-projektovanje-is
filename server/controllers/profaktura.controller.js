const db = require("../db/index");

// PROFAKTURA

async function getProfaktura(req, res, next) {
  try {
    const result = await db.query(
      `select pp.*, g.naziv_grada, d.naziv_drzave, olp.ime_prezime as zaposleni, pr.naziv as prevoznik, np.opis_nacina
    from profaktura_prevoznika pp
    join grad g on pp.id_grada = g.id_grada
    join drzava d on pp.id_drzave = d.id_drzave
    join ovlaceno_lice_prevoznika olp on pp.sifra = olp.sifra
    join prevoznik pr on pp.id_prevoznika = pr.id_prevoznika
    join nacin_placanja np on pp.id_nacina = np.id_nacina`,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleProfaktura(req, res, next) {
  try {
    const result = await db.query(
      `select *
      from profaktura_prevoznika
      where br_profakture = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addProfaktura(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertProfakturaText = ` insert into profaktura_prevoznika
      values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning br_profakture`;
      const insertProfakturaValues = [
        req.body.br_profakture,
        req.body.iznos,
        req.body.datum_prometa,
        req.body.datum_izdavanja,
        req.body.poziv_na_broj,
        req.body.br_ugovora,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.id_nacina,
      ];
      const profaktura = await client.query(
        insertProfakturaText,
        insertProfakturaValues
      );

      if (req.body.stavke_profakture.length <= 0) {
        throw { status: 500, message: "Niste dodali stavke profakture" };
      }

      req.body.stavke_profakture.forEach(async (stavka_profakture) => {
        const insertStavkaText = `insert into stavka_profakture(br_profakture, opis, cena, napomena, jmbg, id_tip_prevoza)
        VALUES ($1, $2, $3, $4, $5, $6)`;
        await client.query(insertStavkaText, [
          profaktura.rows[0].br_profakture,
          stavka_profakture.opis,
          stavka_profakture.cena,
          stavka_profakture.napomena,
          stavka_profakture.jmbg,
          stavka_profakture.id_tip_prevoza,
        ]);
      });

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

async function updateProfaktura(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      if (req.body.stavke_profakture.length <= 0) {
        throw { status: 500, message: "Niste dodali stavke profakture" };
      }

      const deleteStavkeZaRacunText = `DELETE FROM stavka_profakture WHERE br_profakture=$1`;
      await client.query(deleteStavkeZaRacunText, [+req.params.id]);

      req.body.stavke_profakture.forEach(async (stavka_profakture) => {
        const insertStavkaText = `insert into stavka_profakture(br_profakture, opis, cena, napomena, jmbg, id_tip_prevoza)
        VALUES ($1, $2, $3, $4, $5, $6)`;
        await client.query(insertStavkaText, [
          +req.params.id,
          stavka_profakture.opis,
          stavka_profakture.cena,
          stavka_profakture.napomena,
          stavka_profakture.jmbg,
          stavka_profakture.id_tip_prevoza,
        ]);
      });

      const insertProfakturaText = `update profaktura_prevoznika
      set iznos = $1, datum_prometa = $2, datum_izdavanja = $3,
      poziv_na_broj = $4, br_ugovora = $5, id_grada = $6, id_drzave = $7, sifra = $8,
      id_prevoznika = $9, id_nacina = $10
      where br_profakture = $11`;
      const insertProfakturaValues = [
        req.body.iznos,
        req.body.datum_prometa,
        req.body.datum_izdavanja,
        req.body.poziv_na_broj,
        req.body.br_ugovora,
        req.body.id_grada,
        req.body.id_drzave,
        req.body.sifra,
        req.body.id_prevoznika,
        req.body.id_nacina,
        req.params.id,
      ];
      await client.query(insertProfakturaText, insertProfakturaValues);

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

async function deleteProfaktura(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const deleteStavkeProfaktureText = `DELETE FROM stavka_profakture WHERE br_profakture=$1`;
      await client.query(deleteStavkeProfaktureText, [+req.params.id]);

      const deleteProfakturaText = `DELETE FROM profaktura_prevoznika WHERE br_profakture=$1`;
      await client.query(deleteProfakturaText, [+req.params.id]);

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

// STAVKA PROFAKTURE

async function getStavkeZaProfakturu(req, res, next) {
  try {
    const result = await db.query(
      `select sp.*, k.ime_prezime as korisnik, tp.naziv_tipa_prevoza
      from stavka_profakture sp join
      korisnik k on sp.jmbg = k.jmbg
      join tip_prevoza tp on sp.id_tip_prevoza = tp.id_tip_prevoza
      where br_profakture=$1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getStavkeProfakture(req, res, next) {
  try {
    const result = await db.query(
      `select * from stavka_profakture where br_profakture=$1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function getSingleStavkaProfakture(req, res, next) {
  try {
    const result = await db.query(
      `select sp.*, k.ime_prezime as korisnik, tp.naziv_tipa_prevoza
      from stavka_profakture sp join
      korisnik k on sp.jmbg = k.jmbg
      join tip_prevoza tp on sp.id_tip_prevoza = tp.id_tip_prevoza
      where rbr_stavke = $1 and br_profakture = $2`,
      [req.params.id, req.body.br_profakture]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function addStavkaProfakture(req, res, next) {
  try {
    const result = await db.query(
      `insert into stavka_profakture
      (br_profakture, opis, cena, napomena, jmbg, id_tip_prevoza)
      values ($1, $2, $3, $4, $5, $6)`,
      [
        req.body.br_profakture,
        req.body.opis,
        req.body.cena,
        req.body.napomena,
        req.body.jmbg,
        req.body.id_tip_prevoza,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function updateStavkaProfakture(req, res, next) {
  try {
    console.log(req.body);
    const result = await db.query(
      `update stavka_profakture
      set opis = $2, cena = $3, napomena = $4,
      jmbg = $5, id_tip_prevoza = $6
      where rbr_stavke = $7 and br_profakture = $1`,
      [
        req.body.br_profakture,
        req.body.opis,
        req.body.cena,
        req.body.napomena,
        req.body.jmbg,
        req.body.id_tip_prevoza,
        req.body.rbr_stavke,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function deleteStavkaProfakture(req, res, next) {
  try {
    const result = await db.query(
      `delete from stavka_profakture
      where rbr_stavke = $1 and br_profakture = $2`,
      [req.params.id, req.body.br_profakture]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfaktura,
  addProfaktura,
  updateProfaktura,
  deleteProfaktura,
  getSingleProfaktura,
  getStavkeZaProfakturu,
  getStavkeProfakture,
  addStavkaProfakture,
  updateStavkaProfakture,
  deleteStavkaProfakture,
  getSingleStavkaProfakture,
};

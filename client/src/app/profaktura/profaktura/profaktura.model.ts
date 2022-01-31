export interface Profaktura {
  br_profakture: number;
  iznos: number;
  datum_prometa: string;
  datum_izdavanja: string;
  poziv_na_broj: string;
  br_ugovora: number;
  id_grada: number;
  id_drzave: number;
  sifra: number;
  id_prevoznika: number;
  id_nacina: number;
  naziv_grada: string;
  naziv_drzave: string;
  zaposleni: string;
  prevoznik: string;
  opis_nacina: string;
  ukupan_iznos: number;
}

export interface StavkeProfakture {
  opis: string;
  cena: number;
  napomena: string;
  jmbg: string;
  id_tip_prevoza: number;
}

export interface ProfakturaSaStavkama extends Profaktura {
  stavke_profakture: StavkeProfakture[];
}

export interface StavkaZaProfakturu{
  rbr_stavke: number;
  br_profakture: number;
  opis: string;
  cena: number;
  napomena: string;
  jmbg: string;
  id_tip_prevoza: number;
  korisnik: string;
  naziv_tip_prevoza: string;
}
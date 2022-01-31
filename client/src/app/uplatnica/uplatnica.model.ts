export interface Radnik {
  sifra_radnika: number;
  ime_prezime: string;
}

export interface Model {
  id_modela: number;
  opis_modela: string;
}

export interface Valuta {
  id_valute: number;
  naziv_valute: string;
}

export interface Uplatnica {
  br_profakture: number;
  br_racuna: number;
  id_modela: number;
  id_uplatnice: number;
  id_valute: number;
  iznos: number;
  jmbg: string;
  korisnik: string;
  naziv_valute: string;
  opis_modela: string;
  radnik: string;
  sifra_radnika: number;
  svrha_uplate: string;
}

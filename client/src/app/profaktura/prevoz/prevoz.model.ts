export interface Prevoznik {
  br_tekuceg: string;
  br_telefona: string;
  broj: number;
  id_adrese: number;
  id_drzave: number;
  id_grada: number;
  id_prevoznika: number;
  naziv: string;
  naziv_drzave: string;
  naziv_grada: string;
  ulica: string;
}

export interface TipPrevoza {
  id_tip_prevoza: number;
  naziv_tipa_prevoza: number;
}

export interface OvlascenoLice {
  sifra: number;
  id_prevoznika: number;
  ime_prezime: string;
  naziv: string;
}
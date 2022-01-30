export interface ProgramiPutovanja{
    redni_broj_programa: number;
    datum_kreiranja: string;
    sablon_programa: number;
}

export interface ProgramPutovanja{
    sifra_programa: number;
    ukljuceno_u_cenu: string;
    nije_ukljuceno_u_cenu: string;
    iznos: number;
    id_potvrde: number;
    redni_broj_putovanja: number;
    opis: string;
    sablon_programa: string;
}
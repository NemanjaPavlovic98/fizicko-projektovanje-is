export interface Drzava{
    id_drzave: number;
    naziv_drzave: string;
}

export interface Grad{
    id_grada: number;
    id_drzave: number;
    naziv_grada: string;
    naziv_drzave: string;
}

export interface GradForEdit extends Grad{
    drzava_old: number; 
}

export interface Adresa{
    id_adrese: number;
    id_grada: number;
    id_drzave: number;
    ulica: string;
    broj: number;
}

export interface AdresaForEdit extends Adresa{
    drzava_old: number; 
    grad_old: number;
}

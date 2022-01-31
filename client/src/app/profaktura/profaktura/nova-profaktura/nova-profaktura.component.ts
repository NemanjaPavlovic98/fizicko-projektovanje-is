import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { Korisnik } from '../../korisnik/korisnik.model';
import { KorisnikService } from '../../korisnik/korisnik.service';
import { Drzava, Grad } from '../../lokacija/lokacija.model';
import { LokacijaService } from '../../lokacija/lokacija.service';
import { NacinPlacanja } from '../../placanje/placanje.model';
import { PlacanjeService } from '../../placanje/placanje.service';
import {
  OvlascenoLice,
  Prevoznik,
  TipPrevoza,
  UgovorPrevoz,
} from '../../prevoz/prevoz.model';
import { PrevozService } from '../../prevoz/prevoz.service';
import { Profaktura, StavkeProfakture } from '../profaktura.model';
import { ProfakturaService } from '../profaktura.service';

@Component({
  selector: 'app-nova-profaktura',
  templateUrl: './nova-profaktura.component.html',
  styleUrls: ['./nova-profaktura.component.scss'],
})
export class NovaProfakturaComponent implements OnInit {
  dataSource = [];

  profaktura_id: number;
  profakturaForUpdate: Partial<Profaktura>;
  edit_mode = false;
  form: FormGroup;

  drzave: Drzava[];
  gradovi: Grad[];
  ovlascena_lica: OvlascenoLice[];
  prevoznici: Prevoznik[];
  nacin_placanja: NacinPlacanja[];
  ugovori_o_prevozu: UgovorPrevoz[];
  korisnici: Korisnik[];
  tipovi_prevoza: TipPrevoza[];

  //ngModel
  drzavaSelected;
  prevoznikSelected;

  stavke_profakture = [];
  displayedColumns = {
    opis: 'Opis',
    cena: 'Cena',
    napomena: 'Napomena',
    jmbg: 'JMBG Korisnika',
    id_tip_prevoza: 'Tip prevoza',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  objectKeys(obj) {
    return Object.keys(obj);
  }

  constructor(
    private profakturaService: ProfakturaService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private lokacijaService: LokacijaService,
    private prevozService: PrevozService,
    private placanjeService: PlacanjeService,
    private korisnikService: KorisnikService
  ) {}

  ngOnInit(): void {
    forkJoin({
      drzave: this.lokacijaService.getDrzava(),
      prevoznici: this.prevozService.getPrevoznik(),
      placanja: this.placanjeService.getNacinPlacanja(),
      ugovori_o_prevozu: this.prevozService.getUgovorPrevoz(),
      korisnici: this.korisnikService.getKorisnik(),
      tipovi_prevoza: this.prevozService.getTipPrevoza(),
    }).subscribe((res) => {
      (this.drzave = res.drzave),
        (this.prevoznici = res.prevoznici),
        (this.ugovori_o_prevozu = res.ugovori_o_prevozu),
        (this.nacin_placanja = res.placanja),
        (this.korisnici = res.korisnici),
        (this.tipovi_prevoza = res.tipovi_prevoza);
    });

    this.form = this.fb.group({
      br_profakture: new FormControl(null, Validators.required),
      iznos: new FormControl(null, Validators.required),
      datum_prometa: new FormControl(null, Validators.required),
      datum_izdavanja: new FormControl(null, Validators.required),
      poziv_na_broj: new FormControl(null, Validators.required),
      br_ugovora: new FormControl(null, Validators.required),
      id_grada: new FormControl(null, Validators.required),
      id_drzave: new FormControl(null, Validators.required),
      sifra: new FormControl(null, Validators.required),
      id_prevoznika: new FormControl(null, Validators.required),
      id_nacina: new FormControl(null, Validators.required),
      //stavke
      opis: new FormControl(null),
      cena: new FormControl(null),
      napomena: new FormControl(null),
      jmbg: new FormControl(null),
      id_tip_prevoza: new FormControl(null),
    });

    this.profaktura_id = +this.route.snapshot.paramMap.get('id');
    if (this.profaktura_id) {
      console.log(this.profaktura_id);
      this.edit_mode = true;
      this.profakturaService
        .getSingleProfaktura(this.profaktura_id)
        .subscribe((res) => {
          this.profakturaForUpdate = res[0];

          this.profakturaService
            .getStavkeProfakture(this.profaktura_id)
            .subscribe((res: StavkeProfakture[]) => {
              this.stavke_profakture = res;
              this.dataSource = res;
            });

          this.getLiceZaPrevoznika(this.profakturaForUpdate.id_prevoznika);
          this.getGradoviDrzave(this.profakturaForUpdate.id_drzave);

          this.form.patchValue({
            br_profakture: this.profakturaForUpdate.br_profakture,
            iznos: this.profakturaForUpdate.iznos,
            datum_prometa: this.profakturaForUpdate.datum_prometa,
            datum_izdavanja: this.profakturaForUpdate.datum_izdavanja,
            poziv_na_broj: this.profakturaForUpdate.poziv_na_broj,
            br_ugovora: this.profakturaForUpdate.br_ugovora,
            id_grada: this.profakturaForUpdate.id_grada,
            id_drzave: this.profakturaForUpdate.id_drzave,
            sifra: this.profakturaForUpdate.sifra,
            id_prevoznika: this.profakturaForUpdate.id_prevoznika,
            id_nacina: this.profakturaForUpdate.id_nacina,
          });
        });
    }
  }

  addStavka() {
    if (
      this.form.value.opis ||
      this.form.value.cena ||
      this.form.value.napomena ||
      this.form.value.jmbg ||
      this.form.value.id_tip_prevoza
    ) {
      this.stavke_profakture.push({
        opis: this.form.value.opis,
        cena: this.form.value.cena,
        napomena: this.form.value.napomena,
        jmbg: this.form.value.jmbg,
        id_tip_prevoza: this.form.value.id_tip_prevoza,
      });
      this.form.controls['opis'].reset();
      this.form.controls['cena'].reset();
      this.form.controls['napomena'].reset();
      this.form.controls['jmbg'].reset();
      this.form.controls['id_tip_prevoza'].reset();
      this.dataSource = [...this.stavke_profakture];
    } else {
      return;
    }
  }

  onDelete(id) {
    this.stavke_profakture = this.stavke_profakture.filter((pr) => {
      return pr !== id;
    });
    this.dataSource = [...this.stavke_profakture];
  }

  onSignup() {
    if(this.form.invalid){
      return;
    }
    this.form.value.datum_prometa = this.datepipe.transform(
      this.form.value.datum_prometa,
      'yyyy-MM-dd'
    );
    this.form.value.datum_izdavanja = this.datepipe.transform(
      this.form.value.datum_izdavanja,
      'yyyy-MM-dd'
    );
    const finalData = {
      iznos: this.form.value.iznos,
      datum_prometa: this.form.value.datum_prometa,
      datum_izdavanja: this.form.value.datum_izdavanja,
      poziv_na_broj: this.form.value.poziv_na_broj,
      br_ugovora: this.form.value.br_ugovora,
      ...this.form.value.id_grada,
      sifra: this.form.value.sifra,
      id_prevoznika: this.form.value.id_prevoznika,
      id_nacina: this.form.value.id_nacina,
      stavke_profakture: [...this.stavke_profakture],
    };
    if (!this.edit_mode) {
      finalData.br_profakture = this.form.value.br_profakture;
      this.profakturaService.postProfaktura(finalData).subscribe((res) => {
        this.toastService.fireToast(
          'success',
          'Uspesno uneta profaktura sa stavkama'
        );
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      finalData.id_grada = this.form.value.id_grada;
      finalData.id_drzave = this.form.value.id_drzave;
      console.log(finalData);
      this.profakturaService
        .updateProfaktura(this.profaktura_id, finalData)
        .subscribe(() => {
          this.toastService.fireToast(
            'success',
            'Uspesno azurirana profaktura sa stavkama'
          );
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }

  getGradovi(drzava_id?: number) {
    this.lokacijaService.getGradovi(drzava_id).subscribe((res: Grad[]) => {
      this.gradovi = res;
    });
  }

  getGradoviDrzave(drzava_id: number) {
    this.getGradovi(drzava_id);
    this.form.get('id_grada').reset();
  }

  getLiceZaPrevoznika(id_prevoznika: number) {
    this.prevozService.getOvlascenoLice(id_prevoznika).subscribe((res) => {
      this.ovlascena_lica = res;
    });
  }
}

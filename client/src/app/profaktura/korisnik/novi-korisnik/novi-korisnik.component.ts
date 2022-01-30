import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/shared/toast.service';
import { Adresa, Drzava, Grad } from '../../lokacija/lokacija.model';
import { LokacijaService } from '../../lokacija/lokacija.service';
import { Korisnik } from '../korisnik.model';
import { KorisnikService } from '../korisnik.service';
import { ProgramPutovanja } from '../../putovanja/putovanja.model';
import { PutovanjaService } from '../../putovanja/putovanja.service';

@Component({
  selector: 'app-novi-korisnik',
  templateUrl: './novi-korisnik.component.html',
  styleUrls: ['./novi-korisnik.component.scss'],
})
export class NoviKorisnikComponent implements OnInit {
  form: FormGroup;
  updateKorisnik: Partial<Korisnik>;
  jmbg: string;

  editMode: boolean = false;
  adrese: Adresa[];
  drzave: Drzava[];
  gradovi: Grad[];
  programi: ProgramPutovanja[];
  gradSelected: any;
  drzavaSelected: any;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private korisnikService: KorisnikService,
    private lokacijaService: LokacijaService,
    private datepipe: DatePipe,
    private putovanjeService: PutovanjaService
  ) {}

  ngOnInit(): void {
    this.jmbg = this.route.snapshot.paramMap.get('id');

    this.lokacijaService.getDrzava().subscribe((res: Drzava[]) => {
      this.drzave = res;
    });

    this.putovanjeService
      .getProgramPutovanja()
      .subscribe((res: ProgramPutovanja[]) => {
        this.programi = res;
      });

    this.form = new FormGroup({
      br_pasos: new FormControl(null),
      br_telefona: new FormControl(null),
      datum_rodj: new FormControl(null),
      id_adrese: new FormControl(null),
      id_drzave: new FormControl(null),
      id_grada: new FormControl(null),
      ime_prezime: new FormControl(null),
      jmbg: new FormControl(null),
      sifra_programa: new FormControl(null),
    });

    if (this.jmbg) {
      this.editMode = true;
      this.korisnikService
        .getSingleKorisnik(this.jmbg)
        .subscribe((res: Partial<Korisnik>) => {
          this.updateKorisnik = res;

          this.getGradovi(this.updateKorisnik.id_drzave);
          this.getAdrese(
            this.updateKorisnik.id_grada,
            this.updateKorisnik.id_drzave
          );
          this.form.patchValue({
            br_pasos: this.updateKorisnik.br_pasos,
            br_telefona: this.updateKorisnik.br_telefona,
            datum_rodj: this.updateKorisnik.datum_rodj,
            id_drzave: this.updateKorisnik.id_drzave,
            id_grada: this.updateKorisnik.id_grada,
            id_adrese: this.updateKorisnik.id_adrese,
            ime_prezime: this.updateKorisnik.ime_prezime,
            jmbg: this.updateKorisnik.jmbg,
            sifra_programa: this.updateKorisnik.sifra_programa,
          });
          this.gradSelected = this.updateKorisnik.id_grada;
        });
    }
  }

  onAddNew() {
    const finalData = {
      br_pasos: this.form.value.br_pasos,
      br_telefona: this.form.value.br_telefona,
      datum_rodj: this.form.value.datum_rodj,
      ime_prezime: this.form.value.ime_prezime,
      jmbg: this.form.value.jmbg,
      sifra_programa: this.form.value.sifra_programa,
      ...this.form.value.id_adrese,
    };

    this.form.value.datum_kreiranja = this.datepipe.transform(
      this.form.value.datum_kreiranja,
      'yyyy-MM-dd'
    );

    if (!this.editMode) {
      this.korisnikService.postKorisnik(finalData).subscribe((res) => {
        this.toastService.fireToast('success', 'Uspesno unet korisnik');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      this.korisnikService
        .updateKorisnik(this.jmbg, this.form.value)
        .subscribe((res) => {
          this.toastService.fireToast('success', 'Uspesno azuriran korisnik');
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }

  getGradovi(drzava_id?: number) {
    this.lokacijaService.getGradovi(drzava_id).subscribe((res: Grad[]) => {
      this.gradovi = res;
    });
  }

  getAdrese(grad_id?: number, drzava_id?: number) {
    this.lokacijaService
      .getAdrese({ id_drzave: drzava_id, id_grada: grad_id })
      .subscribe((res: Adresa[]) => {
        this.adrese = res;
      });
  }

  getGradoviDrzave(drzava_id: number) {
    this.getGradovi(drzava_id);
    this.form.get('id_grada').reset();
    this.form.get('id_adrese').reset();
  }
  getAdresaGradoviDrzave(grad: any) {
    console.log(grad);
    if (!this.editMode) {
      this.getAdrese(grad.id_grada, grad.id_drzave);
    } else {
      this.getAdrese(grad);
    }
  }
}

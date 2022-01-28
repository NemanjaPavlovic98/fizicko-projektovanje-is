import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { Adresa, Drzava, Grad } from '../../lokacija/lokacija.model';
import { LokacijaService } from '../../lokacija/lokacija.service';
import { Prevoznik } from '../prevoz.model';
import { PrevozService } from '../prevoz.service';

@Component({
  selector: 'app-novi-prevoznik',
  templateUrl: './novi-prevoznik.component.html',
  styleUrls: ['./novi-prevoznik.component.scss'],
})
export class NoviPrevoznikComponent implements OnInit {
  prevoznik_id: number;
  prevoznikForUpdate: Partial<Prevoznik>;
  edit_mode = false;
  form: FormGroup;
  adrese: Adresa[];
  drzave: Drzava[];
  gradovi: Grad[];
  gradSelected: any;
  drzavaSelected: any;

  constructor(
    private prevozService: PrevozService,
    private lokacijaService: LokacijaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      naziv: new FormControl(null),
      br_tekuceg: new FormControl(null),
      br_telefona: new FormControl(null),
      adresa: new FormControl(null),
      drzava: new FormControl(null),
      grad: new FormControl(null),
    });

    this.lokacijaService.getDrzava().subscribe((res: Drzava[]) => {
      this.drzave = res;
    });

    this.prevoznik_id = +this.route.snapshot.paramMap.get('id');
    if (this.prevoznik_id) {
      this.edit_mode = true;
      this.prevozService
        .getSinglePrevoznik(this.prevoznik_id)
        .subscribe((res: Partial<Prevoznik>) => {
          this.prevoznikForUpdate = res[0];

          this.getGradovi(this.prevoznikForUpdate.id_drzave);
          this.getAdrese(
            this.prevoznikForUpdate.id_grada,
            this.prevoznikForUpdate.id_drzave
          );
          this.form.patchValue({
            naziv: this.prevoznikForUpdate.naziv,
            br_tekuceg: this.prevoznikForUpdate.br_tekuceg,
            br_telefona: this.prevoznikForUpdate.br_telefona,
            drzava: this.prevoznikForUpdate.id_drzave,
            grad: this.prevoznikForUpdate.id_grada,
            adresa: this.prevoznikForUpdate.id_adrese,
          });
          this.gradSelected = this.prevoznikForUpdate.id_grada;
        });
    }
  }

  onDelete(id: number) {}

  onSignup() {
    const finalData = {
      naziv: this.form.value.naziv,
      br_tekuceg: this.form.value.br_tekuceg,
      br_telefona: this.form.value.br_telefona,
      ...this.form.value.adresa,
    };

    if (!this.edit_mode) {
      this.prevozService.postPrevoznik(finalData).subscribe((res) => {});
      this.toastService.fireToast('success', 'Uspesno unet prevoznik');
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.prevozService
        .updatePrevoznik(this.prevoznik_id, this.form.value)
        .subscribe((res) => {
          this.toastService.fireToast('success', 'Uspesno azuriran prevoznik');
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
    this.form.get('grad').reset();
    this.form.get('adresa').reset();
  }
  getAdresaGradoviDrzave(grad: any) {
    if (!this.edit_mode) {
      // { id_drzave: number; id_grada: number }
      this.getAdrese(grad.id_drzave, grad.id_grada);
    }
    else{
      this.getAdrese(grad)
    }
  }
}

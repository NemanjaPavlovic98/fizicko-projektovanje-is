import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Drzava } from 'src/app/profaktura/lokacija/lokacija.model';
import { LokacijaService } from 'src/app/profaktura/lokacija/lokacija.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Radnik } from 'src/app/uplatnica/uplatnica.model';
import { UplatnicaService } from 'src/app/uplatnica/uplatnica.service';
import { OvlascenoLice, Prevoznik, UgovorPrevoz } from '../../prevoz.model';
import { PrevozService } from '../../prevoz.service';

@Component({
  selector: 'app-novi-ugovor-o-prevozu',
  templateUrl: './novi-ugovor-o-prevozu.component.html',
  styleUrls: ['./novi-ugovor-o-prevozu.component.scss'],
})
export class NoviUgovorOPrevozuComponent implements OnInit {
  form: FormGroup;
  updateUgovor: UgovorPrevoz;
  id_ugovora: number;
  prevoznikSelected;

  drzave: Drzava[];
  ovlascena_lica: OvlascenoLice[];
  prevoznici: Prevoznik[];
  radnici: Radnik[];
  editMode: boolean = false;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private prevozService: PrevozService,
    private lokacijaService: LokacijaService,
    private uplatnicaService: UplatnicaService
  ) {}

  ngOnInit(): void {
    this.id_ugovora = +this.route.snapshot.paramMap.get('id');

    forkJoin({
      drzave: this.lokacijaService.getDrzava(),
      // ovlascena_lica: this.prevozService.getOvlascenoLice(),
      prevoznici: this.prevozService.getPrevoznik(),
      radnici: this.uplatnicaService.getRadnici(),
    }).subscribe((res) => {
      (this.drzave = res.drzave),
        // (this.ovlascena_lica = res.ovlascena_lica),
        (this.prevoznici = res.prevoznici),
        (this.radnici = res.radnici);
    });

    this.form = new FormGroup({
      datum: new FormControl(null),
      id_drzave: new FormControl(null),
      id_prevoznika: new FormControl(null),
      sifra: new FormControl(null),
      sifra_radnika: new FormControl(null),
    });

    if (this.id_ugovora) {
      this.editMode = true;
      this.prevozService
        .getSingleUgovorPrevoz(this.id_ugovora)
        .subscribe((res: UgovorPrevoz) => {
          this.updateUgovor = res;

          this.getLiceZaPrevoznika(this.updateUgovor.id_prevoznika);
          this.form.patchValue({
            datum: this.updateUgovor.datum,
            id_drzave: this.updateUgovor.id_drzave,
            id_prevoznika: this.updateUgovor.id_prevoznika,
            sifra: this.updateUgovor.sifra,
            sifra_radnika: this.updateUgovor.sifra_radnika,
          });
        });
    }
  }

  onAddNew() {
    if (!this.editMode) {
      this.prevozService.postUgovorPrevoz(this.form.value).subscribe(() => {
        this.toastService.fireToast('success', 'Ugovor uspesno dodat!');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.prevozService
        .updateUgovorPrevoz(this.id_ugovora, this.form.value)
        .subscribe(() => {
          this.toastService.fireToast('success', 'Ugovor uspesno azuriran!');
          this.editMode = false;
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }

  getLiceZaPrevoznika(id_prevoznika: number){
    this.prevozService.getOvlascenoLice(id_prevoznika).subscribe(res => {
      this.ovlascena_lica = res;
    })
  }
}

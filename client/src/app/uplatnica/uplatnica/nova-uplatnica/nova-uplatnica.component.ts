import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Korisnik } from 'src/app/profaktura/korisnik/korisnik.model';
import { KorisnikService } from 'src/app/profaktura/korisnik/korisnik.service';
import { Profaktura } from 'src/app/profaktura/profaktura/profaktura.model';
import { ProfakturaService } from 'src/app/profaktura/profaktura/profaktura.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Model, Radnik, Uplatnica, Valuta } from '../../uplatnica.model';
import { UplatnicaService } from '../../uplatnica.service';

@Component({
  selector: 'app-nova-uplatnica',
  templateUrl: './nova-uplatnica.component.html',
  styleUrls: ['./nova-uplatnica.component.scss'],
})
export class NovaUplatnicaComponent implements OnInit {
  form: FormGroup;
  updateUplatnica: Partial<Uplatnica>;
  id_uplatnice: number;

  editMode: boolean = false;
  radnici: Radnik[];
  valute: Valuta[];
  modeli: Model[];
  korisnici: Korisnik[];
  profakture: Profaktura[];

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private uplatnicaService: UplatnicaService,
    private korisnikService: KorisnikService,
    private profakturaService: ProfakturaService
  ) {}

  ngOnInit(): void {
    this.id_uplatnice = +this.route.snapshot.paramMap.get('id');

    forkJoin({
      modeli: this.uplatnicaService.getModeli(),
      valute: this.uplatnicaService.getValute(),
      radnici: this.uplatnicaService.getRadnici(),
      korisnici: this.korisnikService.getKorisnik(),
      profakture: this.profakturaService.getProfaktura(),
    }).subscribe((res) => {
      (this.modeli = res.modeli),
        (this.valute = res.valute),
        (this.radnici = res.radnici),
        (this.korisnici = res.korisnici),
        (this.profakture = res.profakture);
    });

    this.form = new FormGroup({
      br_profakture: new FormControl(null, Validators.required),
      br_racuna: new FormControl(null, Validators.required),
      id_modela: new FormControl(null, Validators.required),
      id_uplatnice: new FormControl(null, Validators.required),
      id_valute: new FormControl(null, Validators.required),
      iznos: new FormControl(null, Validators.required),
      jmbg: new FormControl(null, Validators.required),
      sifra_radnika: new FormControl(null, Validators.required),
      svrha_uplate: new FormControl(null, Validators.required),
    });

    if (this.id_uplatnice) {
      this.editMode = true;
      this.uplatnicaService
        .getSingleUplatnica(this.id_uplatnice)
        .subscribe((res: Partial<Uplatnica>[]) => {
          console.log(res);
          this.updateUplatnica = res[0];

          this.form.patchValue({
            id_uplatnice: this.updateUplatnica.id_uplatnice,
            br_profakture: this.updateUplatnica.br_profakture,
            br_racuna: this.updateUplatnica.br_racuna,
            id_modela: this.updateUplatnica.id_modela,
            id_valute: this.updateUplatnica.id_valute,
            iznos: this.updateUplatnica.iznos,
            jmbg: this.updateUplatnica.jmbg,
            sifra_radnika: this.updateUplatnica.sifra_radnika,
            svrha_uplate: this.updateUplatnica.svrha_uplate,
          });
        });
    }
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    if (!this.editMode) {
      this.uplatnicaService.postUplatnica(this.form.value).subscribe((res) => {
        this.toastService.fireToast('success', 'Uspesno uneta uplatnica');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      const finalData = {
        ...this.form.value,
        id_uplatnice: null,
      };
      this.uplatnicaService
        .updateUplatnica(this.id_uplatnice, finalData)
        .subscribe((res) => {
          this.toastService.fireToast('success', 'Uspesno azurirana uplatnica');
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }
}

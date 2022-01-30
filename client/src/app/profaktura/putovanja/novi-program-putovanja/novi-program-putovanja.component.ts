import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { PotvrdaRezervacije } from '../../rezervacija/rezervacija.model';
import { RezervacijaService } from '../../rezervacija/rezervacija.service';
import { ProgramiPutovanja, ProgramPutovanja } from '../putovanja.model';
import { PutovanjaService } from '../putovanja.service';

@Component({
  selector: 'app-novi-program-putovanja',
  templateUrl: './novi-program-putovanja.component.html',
  styleUrls: ['./novi-program-putovanja.component.scss'],
})
export class NoviProgramPutovanjaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  form: FormGroup;
  updateProgramPutovanja: ProgramPutovanja;
  id_programa: number;
  programi_putovanja: ProgramiPutovanja[];
  potvrde_rezervacije: PotvrdaRezervacije[];
  editMode: boolean = false;

  constructor(
    private toastService: ToastService,
    private rezervacijaService: RezervacijaService,
    private route: ActivatedRoute,
    private putovanjaService: PutovanjaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_programa = +this.route.snapshot.paramMap.get('id');
    this.putovanjaService
      .getProgramiPutovanja()
      .subscribe((res: ProgramiPutovanja[]) => {
        this.programi_putovanja = res;
      });

    this.rezervacijaService
      .getPotvrdaRezervacije()
      .subscribe((res: PotvrdaRezervacije[]) => {
        this.potvrde_rezervacije = res;
      });

    this.form = new FormGroup({
      ukljuceno_u_cenu: new FormControl(null),
      nije_ukljuceno_u_cenu: new FormControl(null),
      iznos: new FormControl(null),
      id_potvrde: new FormControl(null),
      redni_broj_putovanja: new FormControl(null),
      opis: new FormControl(null),
      sablon_programa: new FormControl(null),
    });

    if (this.id_programa) {
      this.editMode = true;
      this.putovanjaService
        .getSingleProgramPutovanja(this.id_programa)
        .subscribe((res) => {
          this.updateProgramPutovanja = res[0];

          this.form.patchValue({
            ukljuceno_u_cenu: this.updateProgramPutovanja.ukljuceno_u_cenu,
            nije_ukljuceno_u_cenu:
              this.updateProgramPutovanja.nije_ukljuceno_u_cenu,
            iznos: this.updateProgramPutovanja.iznos,
            id_potvrde: this.updateProgramPutovanja.id_potvrde,
            redni_broj_putovanja:
              this.updateProgramPutovanja.redni_broj_putovanja,
            opis: this.updateProgramPutovanja.opis,
            sablon_programa: this.updateProgramPutovanja.sablon_programa,
          });
        });
    }
  }

  onAddNew() {
    if (!this.editMode) {
      this.putovanjaService
        .postProgramPutovanja(this.form.value)
        .subscribe(() => {
          this.toastService.fireToast(
            'success',
            'Program putovanja uspesno dodat!'
          );
          this.router.navigate(['../'], { relativeTo: this.route });
        });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.putovanjaService
        .updateProgramPutovanja(this.id_programa, this.form.value)
        .subscribe(() => {
          this.toastService.fireToast(
            'success',
            'Program putovanja uspesno azuriran!'
          );
          this.editMode = false;
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
  }
}

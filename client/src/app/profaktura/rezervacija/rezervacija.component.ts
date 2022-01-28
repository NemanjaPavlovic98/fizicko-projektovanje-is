import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Radnik } from 'src/app/uplatnica/uplatnica.model';
import { UplatnicaService } from 'src/app/uplatnica/uplatnica.service';
import Swal from 'sweetalert2';
import { PotvrdaRezervacije } from './rezervacija.model';
import { RezervacijaService } from './rezervacija.service';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.scss']
})
export class RezervacijaComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updatePotvrdaRezervacije: PotvrdaRezervacije;
  radnici: Radnik[];

  displayedColumns = {
    id_potvrde: 'ID potvrde rezervacije',
    opis: 'Opis potvrde',
    sifra_radnika: 'Sifra radnika',
    ime_prezime: 'Radnik'
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_potvrde'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_potvrde'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private rezervacijaService: RezervacijaService,
    private toastService: ToastService,
    private uplatnicaService: UplatnicaService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getPotvrdaRezervacije() {
    this.rezervacijaService.getPotvrdaRezervacije().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getPotvrdaRezervacije();
    this.uplatnicaService.getRadnici().subscribe((res: Radnik[]) => {
      this.radnici = res;
    })

    this.form = new FormGroup({
      opis: new FormControl(null),
      sifra_radnika: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.rezervacijaService.postPotvrdaRezervacije(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Potvrda rezervacije uspesno dodata!');
        this.getPotvrdaRezervacije();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.rezervacijaService
        .updatePotvrdaRezervacije(this.updatePotvrdaRezervacije.id_potvrde, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Potvrda rezervacije uspesno azurirana!');
          this.editMode = false;
          this.getPotvrdaRezervacije();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete potvrdu rezervacije?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rezervacijaService.deletePotvrdaRezervacije(id).subscribe(() => {
          Swal.fire('Potvrda rezervacije obrisana!', '', 'success');
          this.getPotvrdaRezervacije();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updatePotvrdaRezervacije = this.dataSource.find((potvrda: PotvrdaRezervacije) => {
      return potvrda.id_potvrde === id;
    });
    this.form.patchValue({
      opis: this.updatePotvrdaRezervacije.opis,
      sifra_radnika: this.updatePotvrdaRezervacije.sifra_radnika,
    });
  }

}

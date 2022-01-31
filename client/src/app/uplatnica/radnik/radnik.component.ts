import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Radnik } from '../uplatnica.model';
import { UplatnicaService } from '../uplatnica.service';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.scss'],
})
export class RadnikComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateRadnik: Radnik;

  displayedColumns = {
    sifra_radnika: 'Sifra radnika',
    ime_prezime: 'Ime i prezime radnika',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['sifra_radnika'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['sifra_radnika'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private uplatnicaService: UplatnicaService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getRadnici() {
    this.uplatnicaService.getRadnici().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getRadnici();

    this.form = new FormGroup({
      ime_prezime: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.uplatnicaService.postRadnik(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Radnik uspesno dodat!');
        this.getRadnici();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.uplatnicaService
        .updateRadnik(this.updateRadnik.sifra_radnika, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Radnik uspesno azuriran!');
          this.editMode = false;
          this.getRadnici();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete radnika?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.uplatnicaService.deleteRadnik(id).subscribe(() => {
          Swal.fire('Radnik obrisan!', '', 'success');
          this.getRadnici();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateRadnik = this.dataSource.find((rad: Radnik) => {
      return rad.sifra_radnika === id;
    });
    this.form.patchValue({
      ime_prezime: this.updateRadnik.ime_prezime,
    });
  }
}

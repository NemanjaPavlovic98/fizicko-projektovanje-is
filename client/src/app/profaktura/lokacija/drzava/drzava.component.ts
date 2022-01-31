import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Drzava } from '../lokacija.model';
import { LokacijaService } from '../lokacija.service';

@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styleUrls: ['./drzava.component.scss'],
})
export class DrzavaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateDrzava: Drzava;

  displayedColumns = {
    id_drzave: 'Sifra drzave',
    naziv_drzave: 'Naziv drzave',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_drzave'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_drzave'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private lokacijeService: LokacijaService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getDrzava() {
    this.lokacijeService.getDrzava().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getDrzava();

    this.form = new FormGroup({
      naziv_drzave: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.lokacijeService.postDrzava(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Drzava uspesno dodata!');
        this.getDrzava();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.lokacijeService
        .updateDrzava(this.updateDrzava.id_drzave, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Drzava uspesno azurirana!');
          this.editMode = false;
          this.getDrzava();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete drzavu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.lokacijeService.deleteDrzava(id).subscribe(() => {
          Swal.fire('Drzava obrisana!', '', 'success');
          this.getDrzava();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateDrzava = this.dataSource.find((drzava: Drzava) => {
      return drzava.id_drzave === id;
    });
    this.form.patchValue({
      naziv_drzave: this.updateDrzava.naziv_drzave,
    });
  }
}

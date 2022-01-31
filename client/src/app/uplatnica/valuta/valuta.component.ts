import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Valuta } from '../uplatnica.model';
import { UplatnicaService } from '../uplatnica.service';

@Component({
  selector: 'app-valuta',
  templateUrl: './valuta.component.html',
  styleUrls: ['./valuta.component.scss'],
})
export class ValutaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateValuta: Valuta;

  displayedColumns = {
    id_valute: 'ID valute',
    naziv_valute: 'Naziv valute',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_valute'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_valute'],
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

  private getValute() {
    this.uplatnicaService.getValute().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getValute();

    this.form = new FormGroup({
      naziv_valute: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.uplatnicaService.postValuta(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Valuta uspesno dodata!');
        this.getValute();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.uplatnicaService
        .updateValuta(this.updateValuta.id_valute, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Valuta uspesno azurirana!');
          this.editMode = false;
          this.getValute();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete valutu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.uplatnicaService.deleteValuta(id).subscribe(() => {
          Swal.fire('Valuta obrisana!', '', 'success');
          this.getValute();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateValuta = this.dataSource.find((valuta: Valuta) => {
      return valuta.id_valute === id;
    });
    this.form.patchValue({
      naziv_valute: this.updateValuta.naziv_valute,
    });
  }
}

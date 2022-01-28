import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { NacinPlacanja } from './placanje.model';
import { PlacanjeService } from './placanje.service';

@Component({
  selector: 'app-placanje',
  templateUrl: './placanje.component.html',
  styleUrls: ['./placanje.component.scss']
})
export class PlacanjeComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateNacinPlacanja: NacinPlacanja;

  displayedColumns = {
    id_nacina: 'ID nacina placanja',
    opis_nacina: 'Opis nacina',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_nacina'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_nacina'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private placanjeService: PlacanjeService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getNacinPlacanja() {
    this.placanjeService.getNacinPlacanja().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getNacinPlacanja();

    this.form = new FormGroup({
      opis_nacina: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.placanjeService.postNacinPlacanja(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Nacin placanja uspesno dodat!');
        this.getNacinPlacanja();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.placanjeService
        .updateNacinPlacanja(this.updateNacinPlacanja.id_nacina, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Nacin placanja uspesno azuriran!');
          this.editMode = false;
          this.getNacinPlacanja();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete nacin placanja?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.placanjeService.deleteNacinPlacanja(id).subscribe(() => {
          Swal.fire('Nacin placanja obrisan!', '', 'success');
          this.getNacinPlacanja();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateNacinPlacanja = this.dataSource.find((nacin_placanja: NacinPlacanja) => {
      return nacin_placanja.id_nacina === id;
    });
    this.form.patchValue({
      opis_nacina: this.updateNacinPlacanja.opis_nacina,
    });
  }

}

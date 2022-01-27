import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Model } from '../uplatnica.model';
import { UplatnicaService } from '../uplatnica.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateModel: Model;

  displayedColumns = {
    id_modela: 'ID modela',
    opis_modela: 'Opis modela',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_modela'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_modela'],
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

  private getModeli() {
    this.uplatnicaService.getModeli().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getModeli();

    this.form = new FormGroup({
      opis_modela: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.uplatnicaService.postModel(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Model uspesno dodat!');
        this.getModeli();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.uplatnicaService
        .updateModel(this.updateModel.id_modela, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Model uspesno azuriran!');
          this.editMode = false;
          this.getModeli();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete model?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.uplatnicaService.deleteModel(id).subscribe(() => {
          Swal.fire('Model obrisan!', '', 'success');
          this.getModeli();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateModel = this.dataSource.find((model: Model) => {
      return model.id_modela === id;
    });
    this.form.patchValue({
      opis_modela: this.updateModel.opis_modela,
    });
  }
}

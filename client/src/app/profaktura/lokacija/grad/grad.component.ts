import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Drzava, Grad } from '../lokacija.model';
import { LokacijaService } from '../lokacija.service';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.scss'],
})
export class GradComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  @ViewChild('formDirectivesSearch') private formDirectiveSearch: NgForm;

  drzave: Drzava[] = [];
  form: FormGroup;
  formSearch: FormGroup;
  editMode = false;
  updateGrad: Partial<Grad>;

  displayedColumns = {
    id_grada: 'ID grada',
    naziv_grada: 'Naziv grada',
    naziv_drzave: 'Drzava',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_grada', 'id_drzave'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_grada'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private lokacijaService: LokacijaService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getGradovi() {
    this.lokacijaService.getGradovi().subscribe((res) => {
      this.dataSource = res;
    });
  }

  getDrzave() {
    this.lokacijaService.getDrzava().subscribe((res: Drzava[]) => {
      this.drzave = res;
    });
  }

  ngOnInit(): void {
    this.getGradovi();
    this.getDrzave();

    this.form = new FormGroup({
      naziv_grada: new FormControl(null, Validators.required),
      drzava: new FormControl(null, Validators.required),
    });

    this.formSearch = new FormGroup({
      pretraga: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.lokacijaService.postGrad(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.formSearch.reset();
        this.formDirectiveSearch.resetForm();
        this.toastService.fireToast('success', 'Grad uspesno dodat!');
        this.getGradovi();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.lokacijaService
        .updateGrad({
          id_grada: this.updateGrad.id_grada,
          drzava_old: this.updateGrad.id_drzave,
          ...this.form.value,
        })
        .subscribe(() => {
          this.form.reset();
          this.formSearch.reset();
          this.formDirective.resetForm();
          this.formDirectiveSearch.resetForm();
          this.toastService.fireToast('success', 'Grad uspesno azuriran!');
          this.editMode = false;
          this.getGradovi();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete grad?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteGrad: Grad = this.dataSource.find((grad: Grad) => {
          return grad.id_grada === id;
        });
        this.lokacijaService.deleteGrad(deleteGrad.id_grada, deleteGrad.id_drzave).subscribe(() => {
          Swal.fire('Grad je obrisan!', '', 'success');
          this.getGradovi();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateGrad = this.dataSource.find((grad: Grad) => {
      return grad.id_grada === id;
    });
    this.form.patchValue({
      naziv_grada: this.updateGrad.naziv_grada,
      drzava: this.updateGrad.id_drzave,
    });
  }

  onSearch() {
    this.lokacijaService
      .getGradovi(this.formSearch.value.pretraga)
      .subscribe((res) => {
        this.dataSource = res;
      });
  }
}

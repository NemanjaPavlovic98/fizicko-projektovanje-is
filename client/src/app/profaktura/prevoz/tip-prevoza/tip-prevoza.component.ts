import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { TipPrevoza } from '../prevoz.model';
import { PrevozService } from '../prevoz.service';

@Component({
  selector: 'app-tip-prevoza',
  templateUrl: './tip-prevoza.component.html',
  styleUrls: ['./tip-prevoza.component.scss']
})
export class TipPrevozaComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateTipPrevoza: TipPrevoza;

  displayedColumns = {
    id_tip_prevoza: 'ID tipa prevoza',
    naziv_tipa_prevoza: 'Naziv prevoza',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_tip_prevoza'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_tip_prevoza'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private prevozService: PrevozService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getTipPrevoza() {
    this.prevozService.getTipPrevoza().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getTipPrevoza();

    this.form = new FormGroup({
      naziv_tipa_prevoza: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.prevozService.postTipPrevoza(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Tip prevoza uspesno dodat!');
        this.getTipPrevoza();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.prevozService
        .updateTipPrevoza(this.updateTipPrevoza.id_tip_prevoza, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Tip prevoza uspesno azuriran!');
          this.editMode = false;
          this.getTipPrevoza();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete tip prevoza?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prevozService.deleteTipPrevoza(id).subscribe(() => {
          Swal.fire('Model obrisan!', '', 'success');
          this.getTipPrevoza();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateTipPrevoza = this.dataSource.find((tip_prevoza: TipPrevoza) => {
      return tip_prevoza.id_tip_prevoza === id;
    });
    this.form.patchValue({
      naziv_tipa_prevoza: this.updateTipPrevoza.naziv_tipa_prevoza,
    });
  }

}

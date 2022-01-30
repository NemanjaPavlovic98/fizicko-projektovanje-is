import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { PutovanjaService } from '../putovanja.service';
import { ProgramiPutovanja } from '../putovanja.model';

@Component({
  selector: 'app-programi-putovanja',
  templateUrl: './programi-putovanja.component.html',
  styleUrls: ['./programi-putovanja.component.scss'],
})
export class ProgramiPutovanjaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateProgramiPutovanja: ProgramiPutovanja;

  displayedColumns = {
    redni_broj_programa: 'Rbr programa',
    datum_kreiranja: 'Datum kreiranja',
    sablon_programa: 'Sablon',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['redni_broj_programa'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['redni_broj_programa'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private putovanjaService: PutovanjaService,
    private toastService: ToastService,
    private datepipe: DatePipe
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getProgramiPutovanja() {
    this.putovanjaService.getProgramiPutovanja().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getProgramiPutovanja();

    this.form = new FormGroup({
      datum_kreiranja: new FormControl(null),
      sablon_programa: new FormControl(null),
    });
  }

  onAddNew() {
    this.form.value.datum_kreiranja = this.datepipe.transform(
      this.form.value.datum_kreiranja,
      'yyyy-MM-dd'
    );

    if (!this.editMode) {
      this.putovanjaService
        .postProgramiPutovanja(this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast(
            'success',
            'Tip programa putovanja uspesno dodat!'
          );
          this.getProgramiPutovanja();
        });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.putovanjaService
        .updateProgramiPutovanja(
          this.updateProgramiPutovanja.redni_broj_programa,
          this.form.value
        )
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast(
            'success',
            'Tip programa putovanja uspesno azuriran!'
          );
          this.editMode = false;
          this.getProgramiPutovanja();
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
        this.putovanjaService.deleteProgramiPutovanja(id).subscribe(() => {
          Swal.fire('Model obrisan!', '', 'success');
          this.getProgramiPutovanja();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateProgramiPutovanja = this.dataSource.find(
      (program: ProgramiPutovanja) => {
        return program.redni_broj_programa === id;
      }
    );
    this.form.patchValue({
      datum_kreiranja: this.updateProgramiPutovanja.datum_kreiranja,
      sablon_programa: this.updateProgramiPutovanja.sablon_programa,
    });
  }
}

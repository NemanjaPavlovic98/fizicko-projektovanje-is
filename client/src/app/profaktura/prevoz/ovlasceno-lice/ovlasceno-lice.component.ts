import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { OvlascenoLice, Prevoznik } from '../prevoz.model';
import { PrevozService } from '../prevoz.service';

@Component({
  selector: 'app-ovlasceno-lice',
  templateUrl: './ovlasceno-lice.component.html',
  styleUrls: ['./ovlasceno-lice.component.scss'],
})
export class OvlascenoLiceComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateOvlascenoLice: OvlascenoLice;
  prevoznici: Prevoznik[];

  displayedColumns = {
    sifra: 'ID',
    ime_prezime: 'Ime i prezime',
    id_prevoznika: 'ID prevoznika',
    naziv: 'Prevoznik',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['sifra'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['sifra', 'id_prevoznika'],
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
      this.onDelete(data.data_id, data.id_prevoznika);
    }
  }

  private getOvlascenoLice() {
    this.prevozService.getOvlascenoLice().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getOvlascenoLice();
    this.prevozService.getPrevoznik().subscribe((res) => {
      this.prevoznici = res;
    });

    this.form = new FormGroup({
      ime_prezime: new FormControl(null),
      id_prevoznika: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.prevozService.postOvlascenoLice(this.form.value).subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast(
          'success',
          'Ovlasceno lice uspesno dodato!'
        );
        this.getOvlascenoLice();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.prevozService
        .updateOvlascenoLice(this.updateOvlascenoLice.sifra, {
          ...this.form.value,
          id_prevoznika_old: this.updateOvlascenoLice.id_prevoznika,
        })
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast(
            'success',
            'Ovlasceno lice uspesno azurirano!'
          );
          this.editMode = false;
          this.getOvlascenoLice();
        });
    }
  }

  onDelete(id: number, id_prevoznika: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete ovlasceno lice?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prevozService.deleteOvlascenoLice(id, id_prevoznika).subscribe(() => {
          Swal.fire('Ovlaceno lice obrisano!', '', 'success');
          this.getOvlascenoLice();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateOvlascenoLice = this.dataSource.find((lice: OvlascenoLice) => {
      return lice.sifra === id;
    });
    this.form.patchValue({
      ime_prezime: this.updateOvlascenoLice.ime_prezime,
      id_prevoznika: this.updateOvlascenoLice.id_prevoznika,
    });
  }
}

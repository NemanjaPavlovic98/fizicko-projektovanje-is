import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Adresa, Drzava, Grad } from './lokacija.model';
import { LokacijaService } from './lokacija.service';

@Component({
  selector: 'app-lokacija',
  templateUrl: './lokacija.component.html',
  styleUrls: ['./lokacija.component.scss'],
})
export class LokacijaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  @ViewChild('formDirectivesSearch') private formDirectiveSearch: NgForm;

  drzave: Drzava[] = [];
  gradovi: Grad[] = [];
  gradoviZaDrzavuSearch: Grad[] = [];
  form: FormGroup;
  formSearch: FormGroup;
  editMode = false;
  updateAdresa: Partial<Adresa>;

  displayedColumns = {
    id_adrese: 'ID grada',
    ulica: 'Ulica',
    broj: 'Broj',
    naziv_grada: 'Naziv grada',
    naziv_drzave: 'Drzava',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['id_adrese', 'id_grada', 'id_drzave'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_adrese'],
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

  private getAdrese() {
    this.lokacijaService.getAdrese().subscribe((res) => {
      this.dataSource = res;
    });
  }

  getDrzave() {
    this.lokacijaService.getDrzava().subscribe((res: Drzava[]) => {
      this.drzave = res;
    });
  }

  getGradovi(drzava?: number) {
    this.lokacijaService.getGradovi(drzava).subscribe((res: Grad[]) => {
      this.gradovi = res;
    });
  }

  getGradoviDrzave(drzava_id: number){
    this.getGradovi(drzava_id);
  }

  getGradoviZaDrzavu(drzava_id: number){
    this.lokacijaService.getGradovi(drzava_id).subscribe((res: Grad[]) => {
      this.gradoviZaDrzavuSearch = res;
    });
  }

  ngOnInit(): void {
    this.getAdrese();
    this.getDrzave();

    this.form = new FormGroup({
      ulica: new FormControl(null, Validators.required),
      broj: new FormControl(null, Validators.required),
      grad: new FormControl(null, Validators.required),
      drzava: new FormControl(null, Validators.required),
    });

    this.formSearch = new FormGroup({
      id_drzave: new FormControl(null, Validators.required),
      id_grada: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.lokacijaService.postAdresa(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Adresa uspesno dodata!');
        this.getAdrese();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.lokacijaService
        .updateAdresa({
          id_adrese: this.updateAdresa.id_adrese,
          drzava_old: this.updateAdresa.id_drzave,
          grad_old: this.updateAdresa.id_grada,
          ...this.form.value,
        })
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Adresa uspesno azurirana!');
          this.editMode = false;
          this.gradovi = [];
          this.getAdrese();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete adresu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteAdresa: Adresa = this.dataSource.find((adresa: Adresa) => {
          return adresa.id_adrese === id;
        });
        this.lokacijaService
          .deleteAdresa(deleteAdresa.id_adrese, deleteAdresa.id_grada, deleteAdresa.id_drzave)
          .subscribe(() => {
            Swal.fire('Adresa je obrisana!', '', 'success');
            this.getAdrese();
          });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateAdresa = this.dataSource.find((adresa: Adresa) => {
      return adresa.id_adrese === id;
    });
    this.getGradovi(this.updateAdresa.id_drzave)
    this.form.patchValue({
      ulica: this.updateAdresa.ulica,
      broj: this.updateAdresa.broj,
      grad: this.updateAdresa.id_grada,
      drzava: this.updateAdresa.id_drzave,
    });
  }

  onSearch() {
    this.lokacijaService
      .getAdrese(this.formSearch.value)
      .subscribe((res) => {
        this.dataSource = res;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { PrevozService } from './prevoz.service';

@Component({
  selector: 'app-prevoz',
  templateUrl: './prevoz.component.html',
  styleUrls: ['./prevoz.component.scss'],
})
export class PrevozComponent implements OnInit {
  loading: boolean = false;
  displayedColumns = {
    id_prevoznika: 'ID prevoznika',
    naziv: 'Naziv prevoznika',
    br_tekuceg: 'Broj tekuceg racuna',
    br_telefona: 'Broj telefona',
    naziv_drzave: 'Drzava',
    naziv_grada: 'Grad',
    ulica: 'Ulica',
    broj: 'Broj',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/profaktura/prevoz/edit-prevoznik',
      param: ['id_prevoznika'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_prevoznika'],
      type: 'delete',
    },
  ];

  constructor(private prevozService: PrevozService) {}

  getPrevoznik() {
    this.loading = true;
    this.prevozService.getPrevoznik().subscribe((res) => {
      this.loading = false;
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getPrevoznik();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete prevoznika?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prevozService.deletePrevoznik(id).subscribe(() => {
          Swal.fire('Prevoznik je obrisan!', '', 'success');
          this.getPrevoznik();
        });
      }
    });
  }
}

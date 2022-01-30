import { Component, OnInit } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { ProfakturaService } from './profaktura.service';

@Component({
  selector: 'app-profaktura',
  templateUrl: './profaktura.component.html',
  styleUrls: ['./profaktura.component.scss'],
})
export class ProfakturaComponent implements OnInit {
  displayedColumns = {
    br_profakture: 'Broj profakture',
    iznos: 'Iznos',
    datum_prometa: 'Datum prometa',
    datum_izdavanja: 'Datum izdavanja',
    opis_nacina: 'Nacina placanja',
    poziv_na_broj: 'Poziv na broj',
    br_ugovora: 'Broj ugovora',
    naziv_drzave: 'Drzava',
    naziv_grada: 'Grad',
    id_prevoznika: 'ID prevoznika',
    prevoznik: 'Ovlasceno lice prevoznika',
    zaposleni: 'Zaposleni',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'pregled stavki',
      icon: 'attach_file',
      route: '/profaktura/stavke_racuna',
      param: ['br_profakture'],
    },
    {
      name: 'edit',
      icon: 'edit',
      route: '/profaktura/edit-profaktura',
      param: ['br_profakture'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['br_profakture'],
      type: 'delete',
    },
  ];

  constructor(private profakturaService: ProfakturaService) {}

  getProfaktura() {
    this.profakturaService.getProfaktura().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getProfaktura();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete profakturu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profakturaService.deleteProfaktura(id).subscribe(() => {
          Swal.fire('Profaktura je obrisana!', '', 'success');
          this.getProfaktura();
        });
      }
    });
  }
}

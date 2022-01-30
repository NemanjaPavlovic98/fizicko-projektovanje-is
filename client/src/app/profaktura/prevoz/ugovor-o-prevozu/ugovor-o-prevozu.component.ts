import { Component, OnInit } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { PrevozService } from '../prevoz.service';

@Component({
  selector: 'app-ugovor-o-prevozu',
  templateUrl: './ugovor-o-prevozu.component.html',
  styleUrls: ['./ugovor-o-prevozu.component.scss'],
})
export class UgovorOPrevozuComponent implements OnInit {
  loading: boolean = false;
  displayedColumns = {
    broj_ugovora: 'Broj ugovora',
    datum: 'Datum',
    naziv_drzave: 'Drzava',
    id_prevoznika: 'ID prevoznika',
    naziv: 'Prevoznik',
    ime_prezime_ovlascenog: 'Ovlasceno lice prevoznika',
    ime_prezime_radnika: 'Radnik',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/profaktura/prevoz/ugovor-o-prevozu/update-ugovor',
      param: ['broj_ugovora'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['broj_ugovora'],
      type: 'delete',
    },
  ];

  constructor(private prevozService: PrevozService) {}

  getUgovorPrevoznik() {
    this.loading = true;
    this.prevozService.getUgovorPrevoz().subscribe((res) => {
      console.log(res);
      this.loading = false;
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getUgovorPrevoznik();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete ugovor?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prevozService.deleteUgovorPrevoz(id).subscribe(() => {
          Swal.fire('Ugovor je obrisan!', '', 'success');
          this.getUgovorPrevoznik();
        });
      }
    });
  }
}

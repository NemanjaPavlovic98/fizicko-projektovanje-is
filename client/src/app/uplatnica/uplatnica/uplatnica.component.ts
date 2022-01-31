import { Component, OnInit } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { UplatnicaService } from '../uplatnica.service';

@Component({
  selector: 'app-uplatnica',
  templateUrl: './uplatnica.component.html',
  styleUrls: ['./uplatnica.component.scss'],
})
export class UplatnicaComponent implements OnInit {
  loading: boolean = false;

  displayedColumns = {
    id_uplatnice: 'ID uplatnice',
    br_profakture: 'Profaktura',
    br_racuna: 'Broj racuna',
    iznos: 'Iznos',
    naziv_valute: 'Valuta',
    opis_modela: 'Model',
    svrha_uplate: 'Svrha uplate',
    jmbg: 'JMBG korisnika',
    korisnik: 'Ime korisnika',
    sifra_radnika: 'Sifra radnika',
    radnik: 'Radnik',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/uplatnica/edit-uplatnica',
      param: ['id_uplatnice'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['id_uplatnice'],
      type: 'delete',
    },
  ];

  constructor(private uplatnicaService: UplatnicaService) {}

  getUplatnica() {
    this.loading = true;
    this.uplatnicaService.getUplatnica().subscribe((res) => {
      this.loading = false;
      this.dataSource = res;
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.getUplatnica();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete uplatnicu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.uplatnicaService.deleteUplatnica(id).subscribe(() => {
          Swal.fire('Uplatnica je obrisana!', '', 'success');
          this.getUplatnica();
        });
      }
    });
  }
}

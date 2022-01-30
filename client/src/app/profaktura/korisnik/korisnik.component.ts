import { Component, OnInit } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { KorisnikService } from './korisnik.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.scss'],
})
export class KorisnikComponent implements OnInit {
  loading: boolean = false;

  displayedColumns = {
    jmbg: 'JMBG',
    ime_prezime: 'Ime i prezime',
    br_pasos: 'Pasos',
    br_telefona: 'Telefon',
    datum_rodj: 'Datum rodjenja',
    naziv_drzave: 'Drzava',
    naziv_grada: 'Grad',
    ulica: 'Ulica',
    broj: 'Broj',
    sifra_programa: 'Program putovanja',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/profaktura/korisnik/edit-korisnik',
      param: ['jmbg'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['jmbg'],
      type: 'delete',
    },
  ];

  constructor(private korisnikService: KorisnikService) {}

  getKorisnik() {
    this.loading = true;
    this.korisnikService.getKorisnik().subscribe((res) => {
      this.loading = false;
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getKorisnik();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Da li zelite da obrisete korisnika?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.korisnikService.deleteKorisnik(id).subscribe(() => {
          Swal.fire('Korisnik je obrisan!', '', 'success');
          this.getKorisnik();
        });
      }
    });
  }
}

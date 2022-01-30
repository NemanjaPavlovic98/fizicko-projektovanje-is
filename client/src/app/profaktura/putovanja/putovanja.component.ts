import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { RezervacijaService } from '../rezervacija/rezervacija.service';
import { PutovanjaService } from './putovanja.service';

@Component({
  selector: 'app-putovanja',
  templateUrl: './putovanja.component.html',
  styleUrls: ['./putovanja.component.scss'],
})
export class PutovanjaComponent implements OnInit {
  displayedColumns = {
    sifra_programa: 'Sifra programa',
    ukljuceno_u_cenu: 'Ukljuceno u cenu',
    nije_ukljuceno_u_cenu: 'Nije ukljuceno u cenu',
    iznos: 'Iznos',
    id_potvrde: 'ID potvrde',
    redni_broj_putovanja: 'Rbr putovanja',
    opis: 'Opis putovanja',
    sablon_programa: 'Sablon programa',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/profaktura/putovanja/novi-program-putovanja',
      param: ['sifra_programa'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['sifra_programa'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private putovanjaService: PutovanjaService,
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getProgramPutovanja() {
    this.putovanjaService.getProgramPutovanja().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.getProgramPutovanja();
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete program putovanja?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.putovanjaService.deleteProgramPutovanja(id).subscribe(() => {
          Swal.fire('Program putovanja obrisan!', '', 'success');
          this.getProgramPutovanja();
        });
      }
    });
  }
}

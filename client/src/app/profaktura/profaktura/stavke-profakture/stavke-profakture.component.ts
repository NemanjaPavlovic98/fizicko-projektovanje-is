import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Korisnik } from '../../korisnik/korisnik.model';
import { KorisnikService } from '../../korisnik/korisnik.service';
import { TipPrevoza } from '../../prevoz/prevoz.model';
import { PrevozService } from '../../prevoz/prevoz.service';
import { StavkaZaProfakturu } from '../profaktura.model';
import { ProfakturaService } from '../profaktura.service';

@Component({
  selector: 'app-stavke-profakture',
  templateUrl: './stavke-profakture.component.html',
  styleUrls: ['./stavke-profakture.component.scss'],
})
export class StavkeProfaktureComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  profaktura_id: number;
  korisnici: Korisnik[];
  tipovi_prevoza: TipPrevoza[];
  sifraStavkeEdit: number;

  displayedColumns = {
    rbr_stavke: 'Rrb stavke',
    br_profakture: 'Profaktura',
    cena: 'Cena',
    opis: 'Opis',
    napomena: 'Napomena',
    korisnik: 'Korisnik',
    naziv_tipa_prevoza: 'Tip prevoza',
  };
  dataSource: StavkaZaProfakturu[] = [];

  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['rbr_stavke', 'br_profakture'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['rbr_stavke', 'br_profakture'],
      type: 'delete',
    },
  ];

  form: FormGroup;
  editMode = false;

  constructor(
    private profakturaService: ProfakturaService,
    private korisnikService: KorisnikService,
    private prevozService: PrevozService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  private getStavkeProfakture() {
    this.profakturaService
      .getStavkeProfakture(this.profaktura_id)
      .subscribe((res: StavkaZaProfakturu[]) => {
        console.log(res)
        this.dataSource = res;
      });
  }

  ngOnInit(): void {
    this.profaktura_id = +this.route.snapshot.paramMap.get('id');
    this.getStavkeProfakture();

    this.korisnikService.getKorisnik().subscribe((res) => {
      this.korisnici = res;
    });

    this.prevozService.getTipPrevoza().subscribe((res) => {
      this.tipovi_prevoza = res;
    });

    this.form = new FormGroup({
      opis: new FormControl(null),
      cena: new FormControl(null),
      napomena: new FormControl(null),
      jmbg: new FormControl(null),
      id_tip_prevoza: new FormControl(null),
    });
  }

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id, data.br_profakture);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onAddNew() {
    for (const key in this.form.value) {
      if (this.form.value[key] === '') {
        this.form.value[key] = null;
      }
    }

    this.profakturaService
      .updateStavkeProfakture({
        ...this.form.value,
        rbr_stavke: this.sifraStavkeEdit,
        br_profakture: this.profaktura_id,
      })
      .subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Stavka uspesno azurirana!');
        this.editMode = false;
        this.getStavkeProfakture();
      });
  }

  onDelete(sifra_stavke: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete stavku za profakturu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profakturaService
          .deleteStavkeProfakture(sifra_stavke, this.profaktura_id)
          .subscribe(() => {
            Swal.fire('Stavka je obrisana!', '', 'success');
            this.getStavkeProfakture();
          });
      }
    });
  }

  onEdit(id: number, br_profakture: number) {
    this.editMode = true;
    this.sifraStavkeEdit = id;
    const updateStavka = this.dataSource.find((stavka) => {
      return stavka.rbr_stavke === id && stavka.br_profakture === br_profakture;
    });

    this.form.patchValue({
      opis: updateStavka.opis,
      cena: updateStavka.cena,
      napomena: updateStavka.napomena,
      jmbg: updateStavka.jmbg,
      id_tip_prevoza: updateStavka.id_tip_prevoza,
    });
  }
}

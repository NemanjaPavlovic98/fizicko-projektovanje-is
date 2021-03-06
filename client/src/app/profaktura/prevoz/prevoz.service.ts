import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {
  OvlascenoLice,
  Prevoznik,
  TipPrevoza,
  UgovorPrevoz,
} from './prevoz.model';

@Injectable({
  providedIn: 'root',
})
export class PrevozService {
  private readonly URL_PREVOZ = `${environment.apiUrl}/prevoz`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  // PREVOZNIK

  getPrevoznik() {
    return this.http.get<Prevoznik[]>(`${this.URL_PREVOZ}/getPrevoznik`);
  }

  getSinglePrevoznik(id: number) {
    return this.http.get<Partial<Prevoznik>>(
      `${this.URL_PREVOZ}/getPrevoznik/${id}`
    );
  }

  postPrevoznik(prevoznik: Partial<Prevoznik>) {
    return this.http.post(`${this.URL_PREVOZ}/postPrevoznik`, prevoznik);
  }

  updatePrevoznik(id: number, prevoznik: Partial<Prevoznik>) {
    return this.http.put(`${this.URL_PREVOZ}/updatePrevoznik/${id}`, prevoznik);
  }

  deletePrevoznik(id: number) {
    return this.http.delete(`${this.URL_PREVOZ}/deletePrevoznik/${id}`);
  }

  // TIP PREVOZA

  getTipPrevoza() {
    return this.http.get<TipPrevoza[]>(`${this.URL_PREVOZ}/getTipPrevoza`);
  }

  postTipPrevoza(tip_prevoza: Partial<TipPrevoza>) {
    return this.http.post(`${this.URL_PREVOZ}/postTipPrevoza`, tip_prevoza);
  }

  updateTipPrevoza(id: number, tip_prevoza: Partial<TipPrevoza>) {
    return this.http.put(
      `${this.URL_PREVOZ}/updateTipPrevoza/${id}`,
      tip_prevoza
    );
  }

  deleteTipPrevoza(id: number) {
    return this.http.delete(`${this.URL_PREVOZ}/deleteTipPrevoza/${id}`);
  }

  // OVLASCENO LICE PREVOZNIKA

  getOvlascenoLice(id_prevoznika?: number) {
    let params = id_prevoznika ? { prevoznik: id_prevoznika } : {};

    return this.http.get<OvlascenoLice[]>(
      `${this.URL_PREVOZ}/getOvlascenoLice`,
      {
        params: params,
      }
    );
  }

  postOvlascenoLice(ovlasceno_lice: Partial<OvlascenoLice>) {
    return this.http.post(
      `${this.URL_PREVOZ}/postOvlascenoLice`,
      ovlasceno_lice
    );
  }

  updateOvlascenoLice(id: number, ovlasceno_lice: Partial<OvlascenoLice>) {
    return this.http.put(
      `${this.URL_PREVOZ}/updateOvlascenoLice/${id}`,
      ovlasceno_lice
    );
  }

  deleteOvlascenoLice(id: number, id_prevoznika: number) {
    return this.http.post(`${this.URL_PREVOZ}/deleteOvlascenoLice/${id}`, {
      id_prevoznika: id_prevoznika,
    });
  }

  // UGOVOR O PREVOZU

  getUgovorPrevoz() {
    return this.http
      .get<UgovorPrevoz[]>(`${this.URL_PREVOZ}/getUgovorPrevoz`)
      .pipe(
        map((res) => {
          res.forEach((program: UgovorPrevoz) => {
            program.datum = this.datepipe.transform(
              program.datum,
              'yyyy-MM-dd'
            );
          });
          return res;
        })
      );
  }

  getSingleUgovorPrevoz(id: number) {
    return this.http
      .get<UgovorPrevoz[]>(`${this.URL_PREVOZ}/getUgovorPrevoz/${id}`)
      .pipe(
        map((res) => {
          res[0].datum = this.datepipe.transform(res[0].datum, 'yyyy-MM-dd');
          return res[0];
        })
      );
  }

  postUgovorPrevoz(ugovor_prevoz: Partial<UgovorPrevoz>) {
    return this.http.post(`${this.URL_PREVOZ}/postUgovorPrevoz`, ugovor_prevoz);
  }

  updateUgovorPrevoz(id: number, ugovor_prevoz: Partial<UgovorPrevoz>) {
    return this.http.put(
      `${this.URL_PREVOZ}/updateUgovorPrevoz/${id}`,
      ugovor_prevoz
    );
  }

  deleteUgovorPrevoz(id: number) {
    return this.http.delete(`${this.URL_PREVOZ}/deleteUgovorPrevoz/${id}`);
  }
}

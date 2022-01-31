import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Profaktura, ProfakturaSaStavkama, StavkaZaProfakturu } from './profaktura.model';

@Injectable({
  providedIn: 'root',
})
export class ProfakturaService {
  private readonly URL_PROFAKTURA = `${environment.apiUrl}/profaktura`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getProfaktura() {
    return this.http
      .get<Profaktura[]>(`${this.URL_PROFAKTURA}/getProfaktura`)
      .pipe(
        map((res) => {
          res.forEach((program: Profaktura) => {
            program.datum_prometa = this.datepipe.transform(
              program.datum_prometa,
              'yyyy-MM-dd'
            );
            program.datum_izdavanja = this.datepipe.transform(
              program.datum_izdavanja,
              'yyyy-MM-dd'
            );
          });
          return res;
        })
      );
  }

  getSingleProfaktura(id: number) {
    return this.http
      .get<Profaktura[]>(`${this.URL_PROFAKTURA}/getSingleProfaktura/${id}`)
      .pipe(
        map((res) => {
          res.forEach((program: Profaktura) => {
            program.datum_prometa = this.datepipe.transform(
              program.datum_prometa,
              'yyyy-MM-dd'
            );
            program.datum_izdavanja = this.datepipe.transform(
              program.datum_izdavanja,
              'yyyy-MM-dd'
            );
          });
          return res;
        })
      );
  }

  postProfaktura(profaktura: Partial<ProfakturaSaStavkama>) {
    return this.http.post(`${this.URL_PROFAKTURA}/postProfaktura`, profaktura);
  }

  updateProfaktura(id: number, profaktura: Partial<Profaktura>) {
    return this.http.put(
      `${this.URL_PROFAKTURA}/updateProfaktura/${id}`,
      profaktura
    );
  }

  deleteProfaktura(id: number) {
    return this.http.delete(`${this.URL_PROFAKTURA}/deleteProfaktura/${id}`);
  }

  getStavkeProfakture(id: number){
    return this.http.get(`${this.URL_PROFAKTURA}/getStavkeZaProfakturu/${id}`)
  }

  updateStavkeProfakture(stavka_profakture: StavkaZaProfakturu){
    return this.http.put(`${this.URL_PROFAKTURA}/updateStavkeProfakture`, stavka_profakture)
  }

  deleteStavkeProfakture(id: number, br_profakture: number){
    return this.http.post(`${this.URL_PROFAKTURA}/deleteStavkeProfakture/${id}`, {br_profakture: br_profakture})
  }
}

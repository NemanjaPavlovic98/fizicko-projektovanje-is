import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Korisnik } from './korisnik.model';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  private readonly URL_KORISNIK = `${environment.apiUrl}/korisnik`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getKorisnik() {
    return this.http.get<Korisnik[]>(`${this.URL_KORISNIK}/getKorisnik`).pipe(
      map((res) => {
        res.forEach((korisnik: Korisnik) => {
          korisnik.datum_rodj = this.datepipe.transform(
            korisnik.datum_rodj,
            'yyyy-MM-dd'
          );
        });
        return res;
      })
    );
  }

  getSingleKorisnik(id: string) {
    return this.http
      .get<Korisnik>(`${this.URL_KORISNIK}/getKorisnik/${id}`)
      .pipe(
        map((res) => {
          res[0].datum_rodj = this.datepipe.transform(
            res[0].datum_rodj,
            'yyyy-MM-dd'
          );
          return res[0];
        })
      );
  }

  postKorisnik(korisnik: Partial<Korisnik>) {
    return this.http.post(`${this.URL_KORISNIK}/postKorisnik`, korisnik);
  }

  updateKorisnik(id: string, korisnik: Partial<Korisnik>) {
    return this.http.put(`${this.URL_KORISNIK}/updateKorisnik/${id}`, korisnik);
  }

  deleteKorisnik(id: string) {
    return this.http.delete(`${this.URL_KORISNIK}/deleteKorisnik/${id}`);
  }
}

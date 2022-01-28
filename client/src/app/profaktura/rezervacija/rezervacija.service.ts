import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PotvrdaRezervacije } from './rezervacija.model';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  private readonly URL_REZERVACIJE = `${environment.apiUrl}/rezervacija`;

  constructor(private http: HttpClient) {}

  getPotvrdaRezervacije(){
    return this.http.get<PotvrdaRezervacije[]>(`${this.URL_REZERVACIJE}/getPotvrdaRezervacije`);
  }

  postPotvrdaRezervacije(nacin_placanja: Partial<PotvrdaRezervacije>) {
    return this.http.post(`${this.URL_REZERVACIJE}/postPotvrdaRezervacije`, nacin_placanja);
  }

  updatePotvrdaRezervacije(id: number, nacin_placanja: Partial<PotvrdaRezervacije>) {
    return this.http.put(`${this.URL_REZERVACIJE}/updatePotvrdaRezervacije/${id}`, nacin_placanja);
  }

  deletePotvrdaRezervacije(id: number) {
    return this.http.delete(`${this.URL_REZERVACIJE}/deletePotvrdaRezervacije/${id}`);
  }
}

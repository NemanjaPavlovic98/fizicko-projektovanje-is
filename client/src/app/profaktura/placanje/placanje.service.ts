import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { NacinPlacanja } from './placanje.model';

@Injectable({
  providedIn: 'root'
})
export class PlacanjeService {
  private readonly URL_NACINA_PLACANJA = `${environment.apiUrl}/placanje`;

  constructor(private http: HttpClient) {}

  getNacinPlacanja(){
    return this.http.get<NacinPlacanja[]>(`${this.URL_NACINA_PLACANJA}/getNacinPlacanja`);
  }

  postNacinPlacanja(nacin_placanja: Partial<NacinPlacanja>) {
    return this.http.post(`${this.URL_NACINA_PLACANJA}/postNacinPlacanja`, nacin_placanja);
  }

  updateNacinPlacanja(id: number, nacin_placanja: Partial<NacinPlacanja>) {
    return this.http.put(`${this.URL_NACINA_PLACANJA}/updateNacinPlacanja/${id}`, nacin_placanja);
  }

  deleteNacinPlacanja(id: number) {
    return this.http.delete(`${this.URL_NACINA_PLACANJA}/deleteNacinPlacanja/${id}`);
  }
}

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Model, Radnik, Uplatnica, Valuta } from './uplatnica.model';

@Injectable({
  providedIn: 'root',
})
export class UplatnicaService {
  private readonly URL_RADNIK = `${environment.apiUrl}/radnik`;
  private readonly URL_MODEL = `${environment.apiUrl}/model`;
  private readonly URL_VALUTA = `${environment.apiUrl}/valuta`;
  private readonly URL_UPLATNICA = `${environment.apiUrl}/uplatnica`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  //   RADNIK

  getRadnici() {
    return this.http.get<Radnik[]>(`${this.URL_RADNIK}/getRadnici`);
  }

  postRadnik(radnik: Partial<Radnik>) {
    return this.http.post(`${this.URL_RADNIK}/postRadnik`, radnik);
  }

  updateRadnik(id: number, radnik: Partial<Radnik>) {
    return this.http.put(`${this.URL_RADNIK}/updateRadnik/${id}`, radnik);
  }

  deleteRadnik(id: number) {
    return this.http.delete(`${this.URL_RADNIK}/deleteRadnik/${id}`);
  }

  //   MODEL

  getModeli() {
    return this.http.get<Model[]>(`${this.URL_MODEL}/getModeli`);
  }

  postModel(model: Partial<Model>) {
    return this.http.post(`${this.URL_MODEL}/postModel`, model);
  }

  updateModel(id: number, model: Partial<Model>) {
    return this.http.put(`${this.URL_MODEL}/updateModel/${id}`, model);
  }

  deleteModel(id: number) {
    return this.http.delete(`${this.URL_MODEL}/deleteModel/${id}`);
  }

  //   VALUTA

  getValute() {
    return this.http.get<Valuta[]>(`${this.URL_VALUTA}/getValute`);
  }

  postValuta(valuta: Partial<Valuta>) {
    return this.http.post(`${this.URL_VALUTA}/postValuta`, valuta);
  }

  updateValuta(id: number, valuta: Partial<Valuta>) {
    return this.http.put(`${this.URL_VALUTA}/updateValuta/${id}`, valuta);
  }

  deleteValuta(id: number) {
    return this.http.delete(`${this.URL_VALUTA}/deleteValuta/${id}`);
  }

   //   UPLATNICA

   getUplatnica() {
    return this.http.get<Uplatnica[]>(`${this.URL_UPLATNICA}/getUplatnica`);
  }

  getSingleUplatnica(id: number) {
    return this.http.get<Uplatnica[]>(`${this.URL_UPLATNICA}/getUplatnica/${id}`);
  }

  postUplatnica(uplatnica: Partial<Uplatnica>) {
    return this.http.post(`${this.URL_UPLATNICA}/postUplatnica`, uplatnica);
  }

  updateUplatnica(id: number, uplatnica: Partial<Uplatnica>) {
    return this.http.put(`${this.URL_UPLATNICA}/updateUplatnica/${id}`, uplatnica);
  }

  deleteUplatnica(id: number) {
    return this.http.delete(`${this.URL_UPLATNICA}/deleteUplatnica/${id}`);
  }
}

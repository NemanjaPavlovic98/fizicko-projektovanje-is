import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Adresa, AdresaForEdit, Drzava, Grad, GradForEdit } from './lokacija.model';

@Injectable({
  providedIn: 'root',
})
export class LokacijaService {
  private readonly URL_LOKACIJA = `${environment.apiUrl}/lokacija`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  //   DRZAVA

  getDrzava() {
    return this.http.get<Drzava[]>(`${this.URL_LOKACIJA}/getDrzava`);
  }

  postDrzava(drzava: Partial<Drzava>) {
    return this.http.post(`${this.URL_LOKACIJA}/postDrzava`, drzava);
  }

  updateDrzava(id: number, drzava: Partial<Drzava>) {
    return this.http.put(`${this.URL_LOKACIJA}/updateDrzava/${id}`, drzava);
  }

  deleteDrzava(id: number) {
    return this.http.delete(`${this.URL_LOKACIJA}/deleteDrzava/${id}`);
  }

  //   GRAD

  getGradovi(drzava_id?: number) {
    let params = drzava_id ? { drzava: drzava_id } : {};
    return this.http.get<Grad[]>(`${this.URL_LOKACIJA}/getGrad`, {
      params: params,
    });
  }

  postGrad(grad: Partial<Grad>) {
    return this.http.post(`${this.URL_LOKACIJA}/postGrad`, grad);
  }

  updateGrad(novi_grad: GradForEdit) {
    return this.http.put(
      `${this.URL_LOKACIJA}/updateGrad/${novi_grad.id_grada}`,
      novi_grad
    );
  }

  deleteGrad(id: number, drzava: number) {
    return this.http.post(`${this.URL_LOKACIJA}/deleteGrad/${id}`, {drzava: drzava});
  }

  //   ADRESA

  getAdrese(search?: Partial<Adresa>) {
    let params = {};
    if (search?.id_drzave) {
      params = { ...params, drzava: search.id_drzave };
    }
    if (search?.id_grada) {
      params = { ...params, grad: search.id_grada };
    }
    return this.http.get<Adresa[]>(`${this.URL_LOKACIJA}/getAdresa`, {
      params: params,
    });
  }

  postAdresa(adresa: Partial<Adresa>) {
    return this.http.post(`${this.URL_LOKACIJA}/postAdresa`, adresa);
  }

  updateAdresa(nova_adresa: AdresaForEdit) {
    return this.http.put(
      `${this.URL_LOKACIJA}/updateAdresa/${nova_adresa.id_adrese}`,
      nova_adresa
    );
  }

  deleteAdresa(id: number, grad: number, drzava: number) {
    return this.http.post(`${this.URL_LOKACIJA}/deleteAdresa/${id}`, {grad: grad, drzava: drzava});
  }
}

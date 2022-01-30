import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ProgramiPutovanja, ProgramPutovanja } from './putovanja.model';

@Injectable({
  providedIn: 'root'
})
export class PutovanjaService {
  private readonly URL_PUTOVANJE = `${environment.apiUrl}/putovanje`;

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  // PROGRAMI PUTOVANJA 

  getProgramiPutovanja(){
    return this.http.get<ProgramiPutovanja[]>(`${this.URL_PUTOVANJE}/getProgramiPutovanja`)
    .pipe(
      map((res) => {
        res.forEach((program: ProgramiPutovanja) => {
          program.datum_kreiranja = this.datepipe.transform(program.datum_kreiranja, 'yyyy-MM-dd');
        });
        return res;
      })
    );
  }

  postProgramiPutovanja(programi_putovanja: Partial<ProgramiPutovanja>) {
    return this.http.post(`${this.URL_PUTOVANJE}/postProgramiPutovanja`, programi_putovanja);
  }

  updateProgramiPutovanja(id: number, programi_putovanja: Partial<ProgramiPutovanja>) {
    return this.http.put(`${this.URL_PUTOVANJE}/updateProgramiPutovanja/${id}`, programi_putovanja);
  }

  deleteProgramiPutovanja(id: number) {
    return this.http.delete(`${this.URL_PUTOVANJE}/deleteProgramiPutovanja/${id}`);
  }

  // PROGRAM PUTOVANJA 

  getProgramPutovanja(){
    return this.http.get<ProgramPutovanja[]>(`${this.URL_PUTOVANJE}/getProgramPutovanja`)
  }

  getSingleProgramPutovanja(id: number){
    return this.http.get<ProgramPutovanja>(`${this.URL_PUTOVANJE}/getProgramPutovanja/${id}`)
  }

  postProgramPutovanja(program_putovanja: Partial<ProgramPutovanja>) {
    return this.http.post(`${this.URL_PUTOVANJE}/postProgramPutovanja`, program_putovanja);
  }

  updateProgramPutovanja(id: number, program_putovanja: Partial<ProgramPutovanja>) {
    return this.http.put(`${this.URL_PUTOVANJE}/updateProgramPutovanja/${id}`, program_putovanja);
  }

  deleteProgramPutovanja(id: number) {
    return this.http.delete(`${this.URL_PUTOVANJE}/deleteProgramPutovanja/${id}`);
  }
}

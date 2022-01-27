import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LokacijaComponent } from './lokacija/lokacija.component';
import { DrzavaComponent } from './lokacija/drzava/drzava.component';
import { GradComponent } from './lokacija/grad/grad.component';
import { ProfakturaRoutingModule } from './profaktura-routing.module';



@NgModule({
  declarations: [
    LokacijaComponent,
    DrzavaComponent,
    GradComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfakturaRoutingModule
  ]
})
export class ProfakturaModule { }

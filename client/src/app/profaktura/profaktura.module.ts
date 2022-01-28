import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LokacijaComponent } from './lokacija/lokacija.component';
import { DrzavaComponent } from './lokacija/drzava/drzava.component';
import { GradComponent } from './lokacija/grad/grad.component';
import { ProfakturaRoutingModule } from './profaktura-routing.module';
import { PrevozComponent } from './prevoz/prevoz.component';
import { NoviPrevoznikComponent } from './prevoz/novi-prevoznik/novi-prevoznik.component';
import { TipPrevozaComponent } from './prevoz/tip-prevoza/tip-prevoza.component';
import { PlacanjeComponent } from './placanje/placanje.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { OvlascenoLiceComponent } from './prevoz/ovlasceno-lice/ovlasceno-lice.component';



@NgModule({
  declarations: [
    LokacijaComponent,
    DrzavaComponent,
    GradComponent,
    PrevozComponent,
    NoviPrevoznikComponent,
    TipPrevozaComponent,
    PlacanjeComponent,
    RezervacijaComponent,
    OvlascenoLiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfakturaRoutingModule
  ]
})
export class ProfakturaModule { }

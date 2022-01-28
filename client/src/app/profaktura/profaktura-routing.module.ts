import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrzavaComponent } from './lokacija/drzava/drzava.component';
import { GradComponent } from './lokacija/grad/grad.component';
import { LokacijaComponent } from './lokacija/lokacija.component';
import { PlacanjeComponent } from './placanje/placanje.component';
import { NoviPrevoznikComponent } from './prevoz/novi-prevoznik/novi-prevoznik.component';
import { OvlascenoLiceComponent } from './prevoz/ovlasceno-lice/ovlasceno-lice.component';
import { PrevozComponent } from './prevoz/prevoz.component';
import { TipPrevozaComponent } from './prevoz/tip-prevoza/tip-prevoza.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';

const routes: Routes = [
  {
    path: 'profaktura',
    children: [
      { path: 'lokacija', component: LokacijaComponent },
      { path: 'grad', component: GradComponent },
      { path: 'drzava', component: DrzavaComponent },
      {
        path: 'prevoz',
        children: [
          { path: '', component: PrevozComponent },
          { path: 'novi-prevoznik', component: NoviPrevoznikComponent },
          { path: 'edit-prevoznik/:id', component: NoviPrevoznikComponent },
          { path: 'tip-prevoza', component: TipPrevozaComponent },
          { path: 'ovlasceno-lice', component: OvlascenoLiceComponent },
        ],
      },
      { path: 'nacin-placanja', component: PlacanjeComponent },
      { path: 'rezervacija', component: RezervacijaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfakturaRoutingModule {}

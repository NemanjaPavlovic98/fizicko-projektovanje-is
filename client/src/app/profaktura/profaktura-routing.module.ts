import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { NoviKorisnikComponent } from './korisnik/novi-korisnik/novi-korisnik.component';
import { DrzavaComponent } from './lokacija/drzava/drzava.component';
import { GradComponent } from './lokacija/grad/grad.component';
import { LokacijaComponent } from './lokacija/lokacija.component';
import { PlacanjeComponent } from './placanje/placanje.component';
import { NoviPrevoznikComponent } from './prevoz/novi-prevoznik/novi-prevoznik.component';
import { OvlascenoLiceComponent } from './prevoz/ovlasceno-lice/ovlasceno-lice.component';
import { PrevozComponent } from './prevoz/prevoz.component';
import { TipPrevozaComponent } from './prevoz/tip-prevoza/tip-prevoza.component';
import { NoviUgovorOPrevozuComponent } from './prevoz/ugovor-o-prevozu/novi-ugovor-o-prevozu/novi-ugovor-o-prevozu.component';
import { UgovorOPrevozuComponent } from './prevoz/ugovor-o-prevozu/ugovor-o-prevozu.component';
import { NovaProfakturaComponent } from './profaktura/nova-profaktura/nova-profaktura.component';
import { ProfakturaComponent } from './profaktura/profaktura.component';
import { StavkeProfaktureComponent } from './profaktura/stavke-profakture/stavke-profakture.component';
import { NoviProgramPutovanjaComponent } from './putovanja/novi-program-putovanja/novi-program-putovanja.component';
import { ProgramiPutovanjaComponent } from './putovanja/programi-putovanja/programi-putovanja.component';
import { PutovanjaComponent } from './putovanja/putovanja.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';

const routes: Routes = [
  {
    path: 'profaktura',
    children: [
      { path: '', component: ProfakturaComponent },
      { path: 'nova-profaktura', component: NovaProfakturaComponent },
      { path: 'edit-profaktura/:id', component: NovaProfakturaComponent },
      { path: 'stavke-profakture/:id', component: StavkeProfaktureComponent },
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
          {
            path: 'ugovor-o-prevozu',
            children: [
              { path: '', component: UgovorOPrevozuComponent },
              { path: 'novi-ugovor', component: NoviUgovorOPrevozuComponent },
              {
                path: 'update-ugovor/:id',
                component: NoviUgovorOPrevozuComponent,
              },
            ],
          },
        ],
      },
      { path: 'nacin-placanja', component: PlacanjeComponent },
      { path: 'rezervacija', component: RezervacijaComponent },
      {
        path: 'putovanja',
        children: [
          { path: '', component: PutovanjaComponent },
          {
            path: 'novi-program-putovanja',
            component: NoviProgramPutovanjaComponent,
          },
          {
            path: 'novi-program-putovanja/:id',
            component: NoviProgramPutovanjaComponent,
          },
          { path: 'programi-putovanja', component: ProgramiPutovanjaComponent },
        ],
      },
      {
        path: 'korisnik',
        children: [
          { path: '', component: KorisnikComponent },
          { path: 'novi-korisnik', component: NoviKorisnikComponent },
          { path: 'edit-korisnik/:id', component: NoviKorisnikComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfakturaRoutingModule {}

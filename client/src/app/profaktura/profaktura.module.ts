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
import { PutovanjaComponent } from './putovanja/putovanja.component';
import { ProgramiPutovanjaComponent } from './putovanja/programi-putovanja/programi-putovanja.component';
import { NoviProgramPutovanjaComponent } from './putovanja/novi-program-putovanja/novi-program-putovanja.component';
import { UgovorOPrevozuComponent } from './prevoz/ugovor-o-prevozu/ugovor-o-prevozu.component';
import { NoviUgovorOPrevozuComponent } from './prevoz/ugovor-o-prevozu/novi-ugovor-o-prevozu/novi-ugovor-o-prevozu.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { NoviKorisnikComponent } from './korisnik/novi-korisnik/novi-korisnik.component';
import { ProfakturaComponent } from './profaktura/profaktura.component';
import { NovaProfakturaComponent } from './profaktura/nova-profaktura/nova-profaktura.component';
import { StavkeProfaktureComponent } from './profaktura/stavke-profakture/stavke-profakture.component';


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
    OvlascenoLiceComponent,
    PutovanjaComponent,
    ProgramiPutovanjaComponent,
    NoviProgramPutovanjaComponent,
    UgovorOPrevozuComponent,
    NoviUgovorOPrevozuComponent,
    KorisnikComponent,
    NoviKorisnikComponent,
    ProfakturaComponent,
    NovaProfakturaComponent,
    StavkeProfaktureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfakturaRoutingModule
  ]
})
export class ProfakturaModule { }

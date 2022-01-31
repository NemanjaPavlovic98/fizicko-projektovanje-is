import { NgModule } from '@angular/core';
import { RadnikComponent } from './radnik/radnik.component';
import { ModelComponent } from './model/model.component';
import { ValutaComponent } from './valuta/valuta.component';
import { UplatnicaRoutingModule } from './uplatnica-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UplatnicaComponent } from './uplatnica/uplatnica.component';
import { NovaUplatnicaComponent } from './uplatnica/nova-uplatnica/nova-uplatnica.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RadnikComponent,
    ModelComponent,
    ValutaComponent,
    UplatnicaComponent,
    NovaUplatnicaComponent
  ],
  imports: [
    UplatnicaRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class UplatnicaModule { }

import { NgModule } from '@angular/core';
import { RadnikComponent } from './radnik/radnik.component';
import { ModelComponent } from './model/model.component';
import { ValutaComponent } from './valuta/valuta.component';
import { UplatnicaRoutingModule } from './uplatnica-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RadnikComponent,
    ModelComponent,
    ValutaComponent
  ],
  imports: [
    UplatnicaRoutingModule,
    SharedModule,
  ]
})
export class UplatnicaModule { }

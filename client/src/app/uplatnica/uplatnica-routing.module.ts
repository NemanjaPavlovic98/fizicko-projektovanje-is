import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './model/model.component';
import { RadnikComponent } from './radnik/radnik.component';
import { NovaUplatnicaComponent } from './uplatnica/nova-uplatnica/nova-uplatnica.component';
import { UplatnicaComponent } from './uplatnica/uplatnica.component';
import { ValutaComponent } from './valuta/valuta.component';

const routes: Routes = [
  {
    path: 'uplatnica',
    children: [
      { path: '', component: UplatnicaComponent },
      { path: 'nova-uplatnica', component: NovaUplatnicaComponent },
      { path: 'edit-uplatnica/:id', component: NovaUplatnicaComponent },
      { path: 'valuta', component: ValutaComponent },
      { path: 'radnik', component: RadnikComponent },
      { path: 'model', component: ModelComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UplatnicaRoutingModule {}
  

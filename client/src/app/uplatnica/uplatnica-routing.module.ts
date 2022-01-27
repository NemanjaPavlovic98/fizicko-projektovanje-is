import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelComponent } from './model/model.component';
import { RadnikComponent } from './radnik/radnik.component';
import { ValutaComponent } from './valuta/valuta.component';

const routes: Routes = [
  {
    path: 'uplatnica',
    children: [
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
  

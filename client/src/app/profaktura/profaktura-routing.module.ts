import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrzavaComponent } from './lokacija/drzava/drzava.component';
import { GradComponent } from './lokacija/grad/grad.component';
import { LokacijaComponent } from './lokacija/lokacija.component';

const routes: Routes = [
  {
    path: 'profaktura',
    children: [
      { path: 'lokacija', component: LokacijaComponent },
      { path: 'grad', component: GradComponent },
      { path: 'drzava', component: DrzavaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfakturaRoutingModule {}

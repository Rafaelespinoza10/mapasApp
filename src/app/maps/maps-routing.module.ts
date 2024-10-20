import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import { MarketsPageComponent } from './pages/markets-page/markets-page.component';
import { PropiertiesPageComponent } from './pages/propierties-page/propierties-page.component';

const routes: Routes = [

  {
    path: '',
    component: MapsLayoutComponent,
    children:[
      {path: 'full-screen', component: FullScreenPageComponent},
      {path: 'markers', component: MarketsPageComponent},
      {path: 'properties', component: PropiertiesPageComponent},
      {path: 'zoom-range', component: ZoomPageComponent},
      {path: '**', redirectTo: 'full-screen'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }

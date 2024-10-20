import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarketsPageComponent } from './pages/markets-page/markets-page.component';
import { PropiertiesPageComponent } from './pages/propierties-page/propierties-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import { RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarketsPageComponent,
    PropiertiesPageComponent,
    ZoomPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    RouterModule,

  ],
  exports:[
    MapsLayoutComponent,
  ]
})
export class MapsModule { }

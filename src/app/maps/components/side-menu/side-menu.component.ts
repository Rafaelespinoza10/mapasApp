import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItem:MenuItem[] =[
      {route: '/maps/full-screen', name:'FullScreen' },
      {route: '/maps/zoom-range', name:'ZommRanges' },
      {route: '/maps/markers', name:'Markers' },
      {route: '/maps/properties', name:'Houses' },
  ]
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environments } from '../../../../environments/environments';
import onResize from 'simple-element-resize-detector';
import H from '@here/maps-api-for-javascript';
import { MapService } from '../../services/maps.service';


@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  private map?: H.Map;

  @ViewChild('map') public mapDiv?: ElementRef;

  constructor(private mapService: MapService){}
  ngAfterViewInit(): void {
    if(!this.mapDiv) return;

    this.map = this.mapService.initializationMap(
      this.mapDiv.nativeElement,
      {lat: 52.5, lng: 13.4 },
      2,
      'satellite',
    );
    this.mapService.enableMapInteraction(this.map);
    this.mapService.onResizeMap(this.map);
  }

}

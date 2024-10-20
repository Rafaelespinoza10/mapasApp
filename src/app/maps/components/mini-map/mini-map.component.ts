import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { MapService } from '../../services/maps.service';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styles: ``
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lnglat?: [number, number];
  private map?: H.Map;
  public zoom: number = 10;
  @ViewChild('map') public mapDiv?: ElementRef;
  public colors = [ '#76d7c4','#bb8fce','#f4d03f','#5499c7','#45b39d','#ff3368','#33ffe9','#080808','#c612ce'];

    constructor(private mapService: MapService){}
    ngAfterViewInit(): void {
      if(!this.mapDiv?.nativeElement) return;
      if(!this.lnglat) throw new Error(' latitude and longitude are required');
      //!TODO crear el mapa
    this.initializationMap();
    this.mapService.onResizeMap(this.map!);
    //!TODO crear el marker en la latitud y longitud que se mandan
    this.addInitializeMarker();
    }

    initializationMap():void{
      if(!this.lnglat) return;
      this.map = this.mapService.initializationMap(
        this.mapDiv!.nativeElement,
        {lat: this.lnglat[1], lng: this.lnglat[0] },
        this.zoom,
        'normal',
      );
    }
    obtainColors():string{
      const aleatoryIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[aleatoryIndex];
    }

    addInitializeMarker():void{
      if(!this.map ) return;

      if(this.lnglat){
        const color = this.obtainColors();
        this.mapService.addCustomMarker( this.lnglat[1], this.lnglat[0],  color, this.map!);
      }
    }

}

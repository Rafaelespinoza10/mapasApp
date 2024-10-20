import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../../services/maps.service';
import { MarkerAndColor } from '../../interfaces/markers.interface';
import { PlainMarker } from '../../interfaces/plain-marker.interface';



@Component({
  templateUrl: './markets-page.component.html',
  styleUrls : ['./markets-page.component.css'],
})
export class MarketsPageComponent {

  private map?: H.Map;
  public zoom: number = 13;
  public lat: number = 22.15;
  public lng: number = -100.97;
  public markers?:MarkerAndColor[] = [];

  public colors = [ '#76d7c4','#bb8fce','#f4d03f','#5499c7','#45b39d','#ff3368','#33ffe9','#080808','#c612ce'];
  @ViewChild('map') public mapDiv?: ElementRef;

  constructor(private mapService: MapService){}
  ngAfterViewInit(): void {
    if(!this.mapDiv) return;
    this.initializationMap();
    this.addPlainMarkerFromStorage();  // agregar los markers del storage (hacer la data persistente )
    this.mapService.enableMapInteraction(this.map!);
    // this.addInitialMarker(); //agregamos un marker inicial en las posicones d einicio
    this.mapService.onResizeMap(this.map!);
    this.mapListeners();  // se agrega un marker cuando se da click

  }

  addPlainMarkerFromStorage():void{
    if(this.map) {
      const plainMarkers:  PlainMarker[] = this.mapService.readFromLocalStorage();
      console.log(plainMarkers);
      plainMarkers.forEach( plainMarker =>{
        const {color,latlng} = plainMarker
        console.log(color);
        console.log(latlng);
        this.mapService.addCustomMarker(latlng[0], latlng[1], color, this.map!);
      });

      //obtengo los markers
      this.markers = this.mapService.getMarkers();
    }
  }

  initializationMap():void{
    this.map = this.mapService.initializationMap(
      this.mapDiv!.nativeElement,
      {lat: this.lat, lng: this.lng },
      this.zoom,
      'normal',
    );
  }

  mapListeners():void{
    this.map?.addEventListener('tap', (evt: any)=>{
      const coord = this.map?.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      if(coord){
        const color = this.obtainColors();
        this.mapService.addCustomMarker(coord.lat, coord.lng, color,  this.map!);
        this.markers = this.mapService.getMarkers();
      }
    });
  }

  obtainColors():string{
    const aleatoryIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[aleatoryIndex];
  }

  addInitialMarker():void{
    if(!this.map) return;
     const color = this.obtainColors();
    this.mapService.addCustomMarker( this.lat, this.lng,  color, this.map);
  }

  deleteMarker(index: number){
    if(!this.map) return;
    this.mapService.cleanMarker(this.map, index);
  }
}

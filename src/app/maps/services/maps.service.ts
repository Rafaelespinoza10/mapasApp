import { Injectable } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { environments } from '../../../environments/environments';
import { MarkerAndColor } from '../interfaces/markers.interface';
import { PlainMarker } from '../interfaces/plain-marker.interface';
@Injectable({providedIn: 'root'})
export class MapService {


  private plataform : H.service.Platform;
  private dafaultLayers : any;
  private apiKey = environments.here_key;
  private rasterTileService : any;
  private markers : MarkerAndColor[] = [];

  constructor() {
    this.plataform = new H.service.Platform({
      apikey : this.apiKey,
    })

    // crear las capas por defecto
    this.dafaultLayers = this.plataform.createDefaultLayers({
      tileSize: 512,    //tamano de los tiles
      ppi: 320,     // pixeles por pulgada
    });
  }

   initializationMap(element: HTMLElement, center : {lat: number, lng: number}, zoom: number, layerTipe: 'normal' | 'satellite' = 'normal'): H.Map{
      let selectedLayer;
      if(layerTipe === 'satellite'){
        selectedLayer = this.dafaultLayers.raster.satellite.map
      }else if(layerTipe === 'normal'){
        selectedLayer = this.dafaultLayers.vector.normal.map;
      }

    const map:H.Map =  this.createNewMap(element, selectedLayer, center, zoom);
    return map;
  }

  private createNewMap(element : HTMLElement, layers : any, center: {lat : number, lng: number}, zoom: number): H.Map{
    return  new H.Map(element, layers, {
      pixelRatio: window.devicePixelRatio,
      center,
      zoom,
    });
  }

   onResizeMap(map: H.Map): void{
      window.addEventListener('resize', () =>{
        map.getViewPort().resize();
      })
  }

  enableMapInteraction(map: H.Map): void{
    const mapsEvents = new H.mapevents.MapEvents(map);
    new H.mapevents.Behavior(mapsEvents);
    map.getViewPort().resize();   // habilitar la rueda del mouse para el zoom.
    this.onResizeMap(map);

  }

  getAvailableLayers(){
    return this.dafaultLayers;
  }

  addMarker(lat: number, lng:number, map: H.Map, color: string ):void{
    if(!map) return;
    const marker = new H.map.Marker({lat, lng});
    this.saveMarkers(map, marker, lat, lng, color);
  }

  addCustomMarker(lat: number, lng: number, color: string,  map: H.Map): void{
    if(!map) return;
   const svg = `<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 4.97 7 13 7 13s7-8.03 7-13c0-3.87-3.13-7-7-7z"/>' +
    '<circle cx="12" cy="9" r="4" fill="#FFFFFF"/>' +
    '</svg>`;
    const icon:H.map.Icon = new H.map.Icon(svg, {anchor: {x:24, y:58}});
    const marker = new H.map.Marker({ lat, lng}, {icon: icon, data: ''});
    this.saveMarkers(map, marker, lat, lng, color);
  }

  saveMarkers(map: H.Map, marker: H.map.Marker, lat: number, lng: number, color: string ):void{
    map.addObject(marker);
    map.setCenter({lat, lng});
    this.markers.push({
      marker, color
    });
    this.saveToLocalStorage();   // guardar marker en el local storage
  }


  cleanMarker(map : H.Map, index: number): void{
    if(!map || index < 0 || index >= this.markers.length) return;
    const { marker } = this.markers[index];

    map.removeObject(marker);
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  getMarkers(): MarkerAndColor[]{
    return this.markers;
  }

 private saveToLocalStorage(){
    console.log(this.markers);

    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      const position = marker.getGeometry(); // Esto puede ser un Point o MultiPoint
      if (position instanceof H.geo.Point) {
        return {
          color,
          latlng : [position.lat, position.lng],
        };
      } else {
        console.error("El marcador no tiene una posición válida de tipo H.geo.Point");
        return {
          color,
          latlng : [0,0],
        };
      }
    });

    localStorage.setItem('plainMarker', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(){
      const plainMarkersString = localStorage.getItem('plainMarker') ?? '[]';
      const plainMarkers = JSON.parse(plainMarkersString);
      return plainMarkers;
  }
}

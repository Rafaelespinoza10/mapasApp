import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { MapService } from '../../services/maps.service';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css'],
})
export class ZoomPageComponent implements AfterViewInit {
  private map?: H.Map;
  public zoom: number = 10;
  public lat: number = 30.64;
  public lng: number = -85.88;

 @ViewChild('map') public mapDiv?: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    if (!this.mapDiv) return;

    this.map = this.mapService.initializationMap(
      this.mapDiv.nativeElement,
      { lat: this.lat, lng: this.lng },
      this.zoom,
      'normal'
    );

    this.mapService.enableMapInteraction(this.map);
    this.mapService.onResizeMap(this.map);
    this.mapListeners();
  }

  mapListeners(): void {
    if (!this.map) throw new Error('Este mapa no existe');

    // Escuchar el evento de cambio de zoom
    this.map.addEventListener('mapzoomend', () => {
      this.updateCenterCoordinates();
      this.zoom = this.map!.getZoom();
      console.log(`Zoom actualizado: ${this.zoom}`); // Para depuración
    });

    // Escuchar el evento de cambio de vista para actualizaciones adicionales
    this.map.addEventListener('mapviewchangeend', () => {
      this.updateCenterCoordinates();
    });
  }

  onZoomChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newZoom = Number(inputElement.value);
    this.zoom = newZoom;
    this.map?.setZoom(newZoom);

    // Esperar un poco antes de actualizar las coordenadas
    setTimeout(() => {
      this.updateCenterCoordinates();
      console.log(this.map?.getCenter());
    }, 100); // Esperar 100 ms
  }

  incrementZoom(): void {
    if (this.zoom < 18) {
      this.zoom++;
      this.map?.setZoom(this.zoom);

      // Esperar un poco antes de actualizar las coordenadas
      setTimeout(() => {
        this.updateCenterCoordinates();
        console.log(`Zoom incrementado a: ${this.zoom}`); // Para depuración
        console.log(this.map?.getCenter());
      }, 100); // Esperar 100 ms
    }
  }

  decreaseZoom(): void {
    if (this.zoom > 2) {
      this.zoom--;
      this.map?.setZoom(this.zoom);

      // Esperar un poco antes de actualizar las coordenadas
      setTimeout(() => {
        this.updateCenterCoordinates();
        console.log(`Zoom disminuido a: ${this.zoom}`); // Para depuración
        console.log(this.map?.getCenter());
      }, 100); // Esperar 100 ms
    }
  }

  updateCenterCoordinates(): void {
    const center = this.map?.getCenter(); // Asegúrate de que sea el centro correcto
    if (center) {
      this.lat = center.lat;
      this.lng = center.lng;
      console.log(`Coordenadas actualizadas: Lat: ${this.lat}, Lng: ${this.lng}`); // Para depuración
    } else {
      console.error('No se pudo obtener el centro del mapa');
    }
  }
}

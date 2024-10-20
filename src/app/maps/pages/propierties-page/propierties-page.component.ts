import { Component } from '@angular/core';
import { House } from '../../interfaces/houses.interface';

@Component({
  templateUrl: './propierties-page.component.html',
  styleUrls:['./propierties-page.component.css'],
})
export class PropiertiesPageComponent {

  public  houses: House[] = [
      {
        title: 'Casa residencial, Canadá',
        description: 'Bella propiedad en Katana, Canadá',
        lngLat: [ -75.92722289474008, 45.280015511264466]
      },
      {
        title: 'Casa de playa, México',
        description: 'Hermosa casa de playa en Acapulco, México',
        lngLat: [ -99.91287720907991, 16.828940930185748]
      },
      {
        title: 'Apartamento, Argentina',
        description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
        lngLat: [ -58.430166677283445, -34.57150108832866 ]
      },
      {
        title: 'Local comercial, España',
        description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
        lngLat: [ -3.7112735618380177, 40.42567285425766 ]
      },

      {
        title: 'Departamento en Florencia, Italia',
        description: 'Hermosa casa disponible en una de las ciudades mas bonitas de Italia',
        lngLat: [11.99638, 43.7712409]
      },
      {
        title: 'Casas Pura Vida en Costa Rica',
        description: 'Casas de lujo muy cerca de la costa en San Jose, CostaRica',
        lngLat: [-84.4600143, 9.5329568]
      }
    ]
}

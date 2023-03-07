import { Component } from '@angular/core';

interface Property {
  title: string;
  description: string;
  lngLat: {long:number; lat:number;};
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {

  public properties: Property[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: {long: -75.92722289474008, lat: 45.280015511264466}
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: {long: -99.91287720907991, lat: 16.828940930185748}
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: {long: -58.430166677283445,  lat:-34.57150108832866 }
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: {long: -3.7112735618380177, lat: 40.42567285425766 }
    },
  ];

  public alert():void{
    alert('This map is static');
  }
}

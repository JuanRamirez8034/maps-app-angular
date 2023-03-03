import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit, AfterViewInit{

  private map !: mapboxgl.Map; //variable para instanciar el mapa
  @ViewChild('zoomMapRang') private mapContainer !: ElementRef; //variable del elemento contenedor del mapa
  public zoom  : number = 8; //variable para el zoom del mapa
  public long !: number; //variable para la longitud
  public lat  !: number; // variable para la latitud

  constructor(private mapsService : MapsService){}

  ngAfterViewInit(): void {
    console.log('Implementando mapa zoom range luego de cargar la vista del componente');
    
    this.map = this.mapsService.getMapMapbox({
      containerId: this.mapContainer.nativeElement,
      center:{lat: this.lat, long: this.long},
      zoom: this.zoom,
    });

    // evento para obtener el zoom actual y actualizar la variable "zoom"
    this.map.on('zoom', event => {
      this.zoom = this.map.getZoom();         //asignando el zoom actual a la variable del zoom
      if(this.zoom > 20)this.map.zoomTo(20);  //restableciendo el zoom a 20 si se sobrepasa
      if(this.zoom < 1)this.map.zoomTo(1.2);  //restableciendo el zoom a 1.2 si baja a menos de 1
    });

    // funcion para asignar los valores de las latitudes y longitudes del centro del mapa
    this.map.on('move', event => {
      const longLat = this.map.getCenter();
      this.lat  = longLat.lat;
      this.long = longLat.lng;      
    });
  }

  ngOnInit(): void {
    console.log('Inplementando mapa zoom range');

    
    // asignando las coordenadas iniciales
    this.lat = -71.6342950814426;
    this.long = 10.693535739004405;
    
    // this.map = this.mapsService.getMapMapbox({
    //   containerId:'zoomMapRang',
    //   center:{lat:-71.6342950814426, long:10.693535739004405},
    //   zoom: 8,
    // });
  }

  // funcion para manejar el zoom en los botones del zoom
  public zoomManager(zoomNumber:string):void{
    // control a traves de numeros
    if(zoomNumber !== '+' && zoomNumber !== '-'){
      this.map.zoomTo(parseFloat(zoomNumber))      
      return;
    }
    // control a traves de botones
    if(zoomNumber === '+')this.map.zoomIn();
    if(zoomNumber === '-')this.map.zoomOut();
    this.zoom = this.map.getZoom();
  }

}

import { ElementRef, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

interface MapBuild{
  containerId :string | HTMLElement;
  controls   ?:boolean;
  center     ?:MapCenter;
  zoom       ?:number;
}

interface MapCenter{
  long : number;
  lat  : number;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor() {// agregando el token de acceso a la configuracion de mapBox
    (mapboxgl as any).accessToken = environment.token_maps;
  }

  // servicio para generar un mapa basado en mapBox, retorna un mapa con la configuracion pasada
  public getMapMapbox(options:MapBuild):mapboxgl.Map{
    console.log('Map mapbox service',options.center ? [  options.center.lat, options.center.long] : undefined, options);
    
    // configurando el mapa a crear
    const map = new mapboxgl.Map({
      container : options.containerId,                                                       //id del contenedor a mostrar el mapa
      center    : options.center ? [  options.center.lat, options.center.long] : undefined,  //cooordenadas para centarra el mapa
      zoom      : options.zoom ? options.zoom : 0,                                           //cantidad de zoom inicial del mapa
      style     : 'mapbox://styles/mapbox/streets-v11',                                      //estilos del mapa
    });


    if(options.controls){
      map.addControl(new mapboxgl.NavigationControl({visualizePitch:true}));//agregando controles al mapa
    }

    return map;//retornando el mapa

  }

}

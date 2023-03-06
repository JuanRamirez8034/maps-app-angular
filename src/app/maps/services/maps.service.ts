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

interface MapMarker{
  mapOfMapBox       : mapboxgl.Map;
  customMarkerModel?: HTMLElement;
  center            : MapCenter;
  draggable        ?: boolean;
  color            ?: string;
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

  // servicio para generar nuevos marcadores
  public createMarker(options:MapMarker):mapboxgl.Marker{

    // si existe un elemento html(marcador personalizado) personalizado se agrega, sino se coloca undefine
    const customMarker : HTMLElement | undefined = options.customMarkerModel ? options.customMarkerModel : undefined;
    // si existe la propiedad draggable se añade true a su valor en la configuracion del marcador (permite moverse)
    const draggableBoolean : boolean = options.draggable ? true : false;
    // si existe la configuracion de generar color ramdon
    const color = options.color ? options.color : undefined;

    const marker = new mapboxgl.Marker( customMarker, {draggable:draggableBoolean, color:color} )//agregando el elemento html personalizado si existe
    .setLngLat([  options.center.lat, options.center.long]) //agregando la latitud y longitud del marcador
    .addTo(options.mapOfMapBox);//agregando la referencia al mapa en el cual se colocará el elemento

    return marker;
  }

  //servicio para generar colores hexadecimal ramdon
  public ramdonColor():string{
    return "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

}

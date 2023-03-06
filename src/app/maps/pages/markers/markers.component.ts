import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import * as mapboxgl from 'mapbox-gl';
import { v4 as uuidV4 } from 'uuid';

interface Marker{
  markerData?:mapboxgl.Marker;
  color     ?:string;
  id         :string;
  lngLat     :{lat:number, lng:number}
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit, AfterViewInit{

  @ViewChild('markersMap') private _markersMapContainer !: ElementRef;  // variable con la instancia del contenedor del mapa
  private _map  !: mapboxgl.Map;  // variable para la instancia del mapa
  public center !: [number, number];// variable para las coordenadas inicial del mapa
  public markers : Marker[] = [];

  constructor(private mapsService : MapsService){}



  ngAfterViewInit(): void {
    console.log('Implementando mapa con marcadores');

    this._map = this.mapsService.getMapMapbox({
      containerId : this._markersMapContainer.nativeElement,
      center: {lat:this.center[0], long:this.center[1]},
      zoom:8
    });

    this.chargeMarkers();//cargando los marcadores del local storange e implementandolos

    // elemento html personalizado para colocarlo como identificador de marcador
    // const markerElement : HTMLElement = document.createElement('div');
    // markerElement.innerHTML='NuevoMarcador';
    
  }

  ngOnInit(): void {
    console.log('Agregando coordenadas del centro del mapa');
    this.center = [-71.6342950814426, 10.693535739004405];
  }


  // funcion para agregar marcadores
  public addMarker():void{

    const ramdonColor : string = this.mapsService.ramdonColor();//generando color aleatorio
    const {lat, lng } = this._map.getCenter();


    // genrando el nuevo maracador
    const newMarker = this.mapsService.createMarker({
      center:{lat:lng, long:lat},
      mapOfMapBox:this._map,
      draggable:true,
      color:ramdonColor
    });

    newMarker.on('dragend', ()=>{this.saveMarkers();});//agregando evento para ctualizar al arrastrar y sonltar
    
    // generando la data del nuevo marcador
    const dataMarker : Marker = {
      id         :uuidV4(),
      color      :ramdonColor,
      markerData : newMarker,
      lngLat : {lat:this.center[0], lng:this.center[1]}
    };

    // agregando el nuevo marcador al arreglo de marcadores
    this.markers.push(dataMarker);

    // agregando el marcador al almacenamiento local
    this.saveMarkers();

    console.log(dataMarker);
  }


  // funcion para ir al marcador
  public goToMarker(markerRef: mapboxgl.Marker):void{
    this._map.flyTo({
      center:markerRef.getLngLat()
    })
  }


  // eliminar todos los marcadores
  public clearMarkers():void{
    console.log('Limpiando todos los marcadores');
    
    localStorage.removeItem('markers');
    this.markers = [];
  }


  // funcion para guardar los marcadores
  private saveMarkers():void{

    const markers : Marker[] = this.markers.map(maker =>{
      const lngLat = maker.markerData!.getLngLat();
      return {
        id: maker.id,
        color: maker.color,
        lngLat:{lng:lngLat.lat, lat: lngLat.lng}
      }
    });

    // agregando el marcador al almacenamiento local
    localStorage.setItem('markers', JSON.stringify(markers));
  }


  // funcion para cargar los marcadores
  private chargeMarkers():void{

    // si no hay marcadores salirmos
    if(!localStorage.getItem('markers')){
      console.log('No hay marcadores locales');
      return;      
    }

    
    // cargando los marcadores del local storange
    console.log('cargando los marcadores locales'); 
    const markers : Marker[]  = JSON.parse(localStorage.getItem('markers')!);
    

    // recorriendo los marcadores locales, añadiendolos al mapa y al arreglo de marcadores
    console.log('Añadiendo los marcadores al mapa');
    markers.forEach(marker =>{

      // generando marcador nuevo
      const newMarker = this.mapsService.createMarker({
        mapOfMapBox : this._map,
        center      : {lat:marker.lngLat.lat, long:marker.lngLat.lng},
        draggable   : true,
        color       : marker.color
      });

      newMarker.on('dragend', ()=>{this.saveMarkers()});//agregando evento para ctualizar al arrastrar y sonltar

      // agregando los marcadores al arreglo de marcadores
      this.markers.push({
        id: marker.id,
        lngLat: {lat:marker.lngLat.lat, lng:marker.lngLat.lng},
        color: marker.color,
        markerData: newMarker
      });

    });

  }

  // funcion para eliminar un marcador del mapa (por id)
  public removeMarker(id:string):void{
    this.markers.forEach(m => {
      if(m.id === id){
        m.markerData?.remove();
      }
    })
    this.markers = this.markers.filter(m => m.id !== id);
    this.saveMarkers();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-full-screen-map',
  templateUrl: './full-screen-map.component.html',
  styleUrls: ['./full-screen-map.component.css']
})
export class FullScreenMapComponent implements OnInit, OnDestroy{
  
  private map : any;

  constructor(private mapService : MapsService){

  }
  
  ngOnInit():void{
    console.log('Implemenetando mapa');
    
    this.map = this.mapService.getMapMapbox({
      containerId:'MapId',
      center:{lat:-71.6342950814426, long:10.693535739004405},
      zoom: 14,
      controls:true
    });
  }





  ngOnDestroy(): void {
    console.log('Destruyendo mapa');
    
    delete this.map;
  }
}

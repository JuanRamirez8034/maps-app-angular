import { Component, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-small-map',
  templateUrl: './small-map.component.html',
  styleUrls: ['./small-map.component.css']
})
export class SmallMapComponent implements AfterViewInit{
  
  @ViewChild('smallMap') private _smallMap !: ElementRef;
  @Input('lat')  public lat  : number = 0;
  @Input('long') public long : number = 0;
  private _map !: mapboxgl.Map;
  
  constructor(private mapsService : MapsService){}

  ngAfterViewInit(): void {
    this._map = this.mapsService.getMapMapbox({
      containerId:this._smallMap.nativeElement,
      zoom:14,
      disableIteractive:true,
      center:{lat:this.long, long:this.lat}
    });

    this.mapsService.createMarker({
      center:{long:this.lat, lat: this.long},
      mapOfMapBox:this._map,
    })
  }

}

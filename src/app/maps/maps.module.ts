import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { SmallMapComponent } from './components/small-map/small-map.component';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    FullScreenMapComponent,
    MarkersComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    ComponentsModule
  ]
})
export class MapsModule { }

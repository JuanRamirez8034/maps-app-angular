import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallMapComponent } from './small-map/small-map.component';



@NgModule({
  declarations: [
    SmallMapComponent
  ],
  exports:[
    SmallMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

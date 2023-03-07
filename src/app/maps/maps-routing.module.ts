import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'fullScreen',
        component:FullScreenMapComponent
      },
      {
        path:'zoom-range',
        component:ZoomRangeComponent
      },
      {
        path:'markers',
        component:MarkersComponent
      },
      {
        path:'properties',
        component:PropertiesComponent
      },
      {
        path:'**',
        redirectTo:'../'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }

import { Component } from '@angular/core';

// interfaz de los items del menu lateral
interface MenuItem{
  path        :string;
  bootsTrapIco:string;
  name        :string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public menu !: MenuItem[];

  constructor(){
    this.menu = [
      {
        name:'Full screen',
        bootsTrapIco:'bi bi-arrows-fullscreen',
        path:'/maps/fullScreen'
      },
      {
        name:'Zoom range',
        bootsTrapIco:'bi bi-zoom-in',
        path:'/maps/zoom-range'
      },
      {
        name:'Marks',
        bootsTrapIco:'bi bi-geo-alt',
        path:'/maps/markers'
      },
      {
        name:'Properties',
        bootsTrapIco:'bi bi-bar-chart-steps',
        path:'/maps/properties'
      },
    ]
  }
}

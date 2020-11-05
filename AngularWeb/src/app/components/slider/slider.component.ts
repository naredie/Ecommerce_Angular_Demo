import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  //utilizando el @input puedo leer propiedades definidas en el controlador padre app.component.html
  @Input() nombre: string;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
  }

}

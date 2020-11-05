import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [ArticleService]
})
export class FormularioComponent implements OnInit {

  public title: string;
  public user: any;
  constructor() {
    this.title = "Contacto";

    //hago el usuario asi sin modelo porque son muy pocas propiedades las que va a tener usuario
    this.user = {
      nombre:'',
      apellidos: '',
      descripcion: '',
      genero:''
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
  }

}

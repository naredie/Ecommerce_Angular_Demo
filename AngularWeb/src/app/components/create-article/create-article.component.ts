import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
  providers: [ArticleService]
})
export class CreateArticleComponent implements OnInit {

  public article: ArticleModel;
  public status: string;
  public page_title = "Crear nuevo articulo";
  public is_edit: boolean;
  public url: string;

  constructor(private _articleService: ArticleService, private _route: ActivatedRoute,
    private _router: Router,) {
    this.article = new ArticleModel('', '', '', '', '', null, null, '');
    this.is_edit = false;
    this.url = Global.url;
  }

  //esto configura la libreria para subir imagenes
  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + 'upload-image',
      method: "POST",
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Sube tu imagen para el articulo',
      afterUploadMsg_success: 'Imagen subida correctamente',
      afterUploadMsg_error: 'Error en la subida de imagen',
      sizeLimit: 'Tu imagen es demasiado pesada'
    }
  };

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.article = response.article;
          this.status = 'success';
          //alerta guardado
          swal(
            'Creacion de articulo',
            'El articulo se ha creado correctamente',
            'success'
          )
          this._router.navigate(['/tienda']);
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }


  imageUpload(data) {
    //despues de guardar la imagen en la B.D la vinculamos al articulo
    this.article.image = data.body.image;
  }



}

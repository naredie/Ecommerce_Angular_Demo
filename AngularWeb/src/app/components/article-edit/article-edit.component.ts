import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../create-article/create-article.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article: ArticleModel;
  public status: string;
  public is_edit: boolean;
  public page_title = "Editar articulo";
  public url: string;

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

  constructor(private _articleService: ArticleService, private _route: ActivatedRoute,
    private _router: Router ) {
    this.article = new ArticleModel('', '', '', '', '', null, null, '');
  this.is_edit = true;
  this.url= Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var articleID = params['id'];

      this._articleService.getArticle(articleID).subscribe(response => {
        if (response.articleresult) {
          this.status = 'success';
          this.article = response.articleresult;
        }
        else {
          this.status = 'error';
          this._router.navigate(['/tienda']);
        }
      }),
        error => {
        console.log(error);
        this._router.navigate(['/tienda']);
      }
    })
  }


  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.article) {
          this.status = 'success';
          this.article = response.article;
          //alerta guardado
          swal(
            'Edicion de articulo',
            'El articulo se ha editado correctamente',
            'success'
          )
          this._router.navigate(['/tienda/articulo/' + this.article._id]); 
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
        //alerta guardado
        swal(
          'Edicion fallida',
          'El articulo no ha podido editarse correctamente',
          'error'
        )
      }
    );
  }


  imageUpload(data) {
    //despues de guardar la imagen en la B.D la vinculamos al articulo
    this.article.image = data.body.image;
  }



}

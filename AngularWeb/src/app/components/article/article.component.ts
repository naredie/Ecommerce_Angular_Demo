import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleService} from '../../services/article.service';
import { ArticleModel} from '../../models/article'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { error } from '@angular/compiler/src/util';
import swal from 'sweetalert';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  public article: ArticleModel;
  public url: string;


  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.articleresult) {
            this.article = response.articleresult;
          }
          else {
            this._router.navigate(['/tienda']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/tienda']);
        }

      )
    })
   
  }
  deleteItem(articleid) {

    swal({
      title: "Seguro que quieres eliminar este articulo?",
      text: "Si eliminas el articulo desaparecera de la tienda",
      icon: "warning",
      buttons: [true,true],
      dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
          this._articleService.delete(articleid).subscribe(
            response => {
              if (response) {
                this._router.navigate(['/tienda']);
              }
            },
            error => {
              console.log(error);
              //aunque genere un error voy a redirigir a la tienda
              this._router.navigate(['/tienda']);
            });

          swal("Articulo eliminado correctamente", {
            icon: "success",
          });
        } else {
          swal("El articulo no se eliminara");
        }
      });

  }


}

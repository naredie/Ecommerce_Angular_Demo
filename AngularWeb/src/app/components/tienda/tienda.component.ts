import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article';
import { Global } from '../../services/global';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [ArticleService] 
})
export class TiendaComponent implements OnInit {
  public title: string;
  public articles: ArticleModel[];
  public url: string;

  constructor(private _articleservice: ArticleService) {
    this.title = "Todos los articulos";
    this.url = Global.url;
  }

  ngOnInit() {
    //un observable puede ser subscrito
    this._articleservice.getArticles().subscribe(
      response => {
        if (response.articles) {
          this.articles = response.articles;
        } else {
          this.articles = [];
        }
      }, error => {
        console.log('error ' + error);
      }
    );
  }


}

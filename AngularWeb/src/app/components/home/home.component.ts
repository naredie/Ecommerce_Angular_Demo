import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService] 
})
export class HomeComponent implements OnInit {
  public title: string;
  public articles: ArticleModel[];

  constructor(private _articleservice: ArticleService) {
    this.title = "Últimos articulos";
}

  ngOnInit() {
    this._articleservice.getArticles('last').subscribe(
      response => {
        console.log(response.articles);
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

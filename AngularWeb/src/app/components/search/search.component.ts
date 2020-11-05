import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ArticleModel } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArticleService]
})
export class SearchComponent implements OnInit {

  public searchname: string;
  public articles: ArticleComponent[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) { }

  ngOnInit() {

    this._route.params.subscribe(params => {
      var search = params['search'];
      this.searchname = search;
      this._articleService.search(search).subscribe(
        response => {
          if (response.articles) {
            this.articles = response.articles;
          }
          else {
            this.articles = [];
          }
        }, error =>{
          console.log(error);
          this.articles = [];
        }

      )
    })
  }

}

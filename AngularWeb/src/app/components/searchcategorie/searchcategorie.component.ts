import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-searchcategorie',
  templateUrl: './searchcategorie.component.html',
  styleUrls: ['./searchcategorie.component.css'],
  providers: [ArticleService]
})
export class SearchcategorieComponent implements OnInit {
  public categorie: string;
  public articles: ArticleComponent[];

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var searchcategorie = params['categorie'];
      this.categorie = searchcategorie;
      this._articleService.searchbyCategorie(searchcategorie).subscribe(
        response => {
          if (response.articles) {
            this.articles = response.articles;
          }
          else {
            this.articles = [];
          }
        }, error => {
          console.log(error);
          this.articles = [];
        }
      )
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [ArticleService]
})
export class CategoriesComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService) { }

  ngOnInit(): void {
  }


  searchCategorie(searchString) {
    this._router.navigate(['buscarcategoria/' + searchString])
  }

}

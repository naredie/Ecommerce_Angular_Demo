import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.css'],
  providers: [ArticleService]
})
export class BlogSidebarComponent implements OnInit {
  public searchString: string;
  public categories: string[];

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _articleService: ArticleService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  goSearch() {
    this._router.navigate(['buscar/' + this.searchString])
  }


  getCategories() {
    this._articleService.getCategories().subscribe(res => {
      if (res.categories) {
        this.categories = res.categories;
      }
      else {
        this.categories = [];
      }
    }); 
  }

}

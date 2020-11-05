import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService] 
})
export class BlogComponent implements OnInit {
  public title: string;
  @Input() blogArticles: ArticleModel[];
  public url: string;
  public searchString: string;
  constructor(private _articleservice: ArticleService, private _route: ActivatedRoute,
    private _router: Router) {
    this.title = "Blog";
    this.url = Global.url;
  }



  ngOnInit() {
    //console.log(this._articleservice.pruebas());
   this._articleservice.getArticles().subscribe(
      response => {
        if (response.articles) {
          this.blogArticles = response.articles;
        } else {
          this.blogArticles = [];
        }
      }, error => {
        console.log('error '+error);
      }
    );
  }

 


}

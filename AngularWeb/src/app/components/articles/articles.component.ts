import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from '../../models/article';
import { CartModel } from '../../models/cart';
import { Global } from '../../services/global';
import { CartService } from '../../services/cart.service';
import { ArticleService } from '../../services/article.service';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [CartService]
})
export class ArticlesComponent implements OnInit {
  public url: string;

  //Imput  significa que la lista de articulos viene dada por el componente padre
  @Input() articles: ArticleModel[];
  product: CartModel;

  constructor(
    private _cartService: CartService,
    private _articleService: ArticleService,
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  //esto manda el articulo al carrito
  handlAddToCart(article) {
    if (article) {
      this.product = this.transformArticletoCartProduct(article);
      this._cartService.addProductToCart(this.product).subscribe(response => {
        this._articleService.sendCartMsg(article);
        //si no hago un reload, el componente header no hace reload. en el resto de la web esto funciona sin reload()
         location.reload();
      })
    }
  }


  transformArticletoCartProduct(article: ArticleModel) {
    let tempCartproduct = new CartModel("", article._id, article.title, parseInt(article.price), 1, article.image, article.categorie);
    return tempCartproduct;
  }


}

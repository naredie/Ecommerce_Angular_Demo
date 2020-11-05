import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { CartService } from '../../services/cart.service';
import { ArticleModel } from '../../models/article'
import { CartModel } from '../../models/cart'
import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ArticleService,  CartService]
})
export class HeaderComponent implements OnInit {

  public totalproducts: number;
  public searchString: string;



  constructor(private _cartService: CartService, private _articleService: ArticleService, private _route: ActivatedRoute,
    private _router: Router) {

  }

  ngOnInit(): void {
    this.getCountProducts();
  }

  goSearch() {
    this._router.navigate(['buscar/' + this.searchString])
  }

  getCountProducts() {
    this._cartService.getCartItems().subscribe(
      response => {
        if (response) {
          this.totalproducts = 0;
          for (let product of response.products) {
            if (!isNaN(Number(product.qty))){
              this.totalproducts = this.totalproducts + Number(product.qty);
            }
          }
        } 
      }, error => {
        console.log('error ' + error);
      }
      );
  }
}

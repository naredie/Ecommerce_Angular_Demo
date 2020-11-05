import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart'
import { ArticleModel } from '../../models/article'
import { ArticleService } from '../../services/article.service';
import swal from 'sweetalert';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css'],
  providers: [CartService]
})
export class CarroComponent implements OnInit {
  cartItems = [];
  cartTotal = 0;
  totalproducts = 0;

  constructor(private _cartService: CartService, private _articleService: ArticleService, private _route: ActivatedRoute,
    private _router: Router, ) { }

  ngOnInit() {
    //on init cargamos nuestro observable. 
    this.handlAddproductsTocart();
    this.loadCartItems();
    this.calculateCartTotal();
  }

  handlAddproductsTocart() {
    //subscribe lo que hace es activarlo en cuanto tenemos un evento 
    this._articleService.getCartMsg().subscribe((product: ArticleModel) => {
      //this.addProductToCart(product);
      this.loadCartItems();
    })
  }


  loadCartItems() {
    //un observable puede ser subscrito
    this._cartService.getCartItems().subscribe(
      response => {
        if (response) {
          this.cartItems = [];
          this.cartTotal = 0;
          this.totalproducts = 0;
          for (let product of response.products) {
            let productExist = false;
            for (let index in this.cartItems) {
              if (this.cartItems[index].cartid === product.cartid) {
                //si el articulo existe ya en el carro incrementamos la cantidad
                this.cartItems[index].qty = this.cartItems[index].qty + 1;
                productExist = true;
                break;
              }
            }

            //si el producto no existe entonces lo anado al carro
            if (!productExist) {
              this.cartItems.push(new CartModel(product._id, product.cartid, product.title, product.price, 1, product.image, product.categorie))
            }
          }

          //calculo el precio total
          this.calculateCartTotal();
        } else {
          this.cartItems = [];
          //calculo el precio total
          this.calculateCartTotal();
        }
      }, error => {
        console.log('error ' + error);
      }
    );
  }

  calculateCartTotal() {
    //calculo del total
    this.cartTotal = 0;
    //calculo el total
    this.cartItems.forEach(item => {
      if (item.qty != null && item.price != null) {
        this.cartTotal += (item.qty * item.price);
      }
    })
  }

  prepareDeleteProduct(event) {
    var productToDelete = event.producto;
    this.deleteItem(productToDelete);
  }

  deleteItem(articleId) {
    swal({
      title: "Seguro que quieres eliminar este articulo del carro?",
      text: "Si eliminas el producto desaparecera del carro",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this._cartService.delete(articleId).subscribe(
          response => {
            if (response) {
              //this._router.navigate(['/tienda']);
              this.loadCartItems();
              location.reload();
            }
          },
          error => {
            console.log(error);
            //aunque genere un error voy a redirigir a la tienda
            //this._router.navigate(['/tienda']);
            this.loadCartItems();
          });

        swal("Producto eliminado correctamente", {
          icon: "success",
        });
      } else {
        swal("El producto no se eliminara");
      }
    });
  }

}

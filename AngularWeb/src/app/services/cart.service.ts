import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//subject sirve para hacer lisen y trigger 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Global } from './global';
import { CartModel } from '../models/cart';
@Injectable()
export class CartService {
  public url: string;
  subject = new Subject();
  public totalproducts: number;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this.totalproducts = 0;
  }

  //Obtenemos los datos de la B.D, los preparamos para que sean objetos para el carro
  //se anade un a cuantity si el elemento ya existe en el carro y si no se anade el item entero
  getCartItems(): Observable<any> {
    //obtenemos los datos de la B.D y los preparamos para el carrito
    return this._http.get(this.url + 'cartproducts');
  }

  addProductToCart(product: CartModel): Observable<any> {
    return this._http.post(this.url + 'saveProdCart', product);
  }

  delete(articleID): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax

    return this._http.delete(this.url + 'cartproducts/' + articleID, { headers: headers });
  }

  //esto sera recibido por el carro
  getCartMsg() {
    return this.subject.asObservable(); // esto significa que recibo algo
  }

}


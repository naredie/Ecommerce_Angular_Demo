import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleModel } from '../models/article';
import { Global } from './global';
import { Subject } from 'rxjs';
import {Output } from '@angular/core';
@Injectable()
export class ArticleService {

  public url: string;
  subject = new Subject();

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getArticles(last: any = null): Observable<any> {
    var articles = '';
    //si last no es null hacemos la llamada para listar solo los ultimos articulos
    if (last != null) {
      articles = 'articles/last'; 
    } else {
      //si no, llamamos a todos los articulos
      articles = 'articles'; 
    }
      return this._http.get(this.url + articles);

  }

  getCategories(): Observable<any> {
    var articles = '';   
    return this._http.get(this.url + 'categories/');

  }


  getArticle(articleId): Observable<any> {
    return this._http.get(this.url + 'article/' + articleId);
  }

  //otra manera de definirlo mas adecuada
  //getArticle(articleId): Observable<ArticleModel[]> {
  //  return this._http.get<ArticleModel[]>(this.url + 'article/' + articleId);
  //}

  search(searchString): Observable<any> {
    return this._http.get(this.url + 'search/' + searchString);
  }

  searchbyCategorie(searchString): Observable<any> {
    return this._http.get(this.url + 'search/categorie/' + searchString); 
  }


  //este metodo sera enviado por el articleItem
  sendCartMsg(article) {
    this.subject.next(article); //esto significa que estamos triggering o enviando eventos
  }

  //esto sera recibido por el carro
  getCartMsg() {
    return this.subject.asObservable(); // esto significa que recibo algo
  }


  create(article): Observable<any>{
    //convierto a json string para poder pasarselo a lbackend
    let params = JSON.stringify(article);
    //configurar las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax
    return this._http.post(this.url + 'save/', params, { headers: headers })
  }


  update(articleID, article: ArticleModel): Observable<any> {
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax
    //params son los datos reales que quiero cambiar
    return this._http.put(this.url + 'article/' + articleID, params, { headers: headers })
  }

  delete(articleID): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax

    return this._http.delete(this.url + 'article/' + articleID,{ headers: headers })
  }

}

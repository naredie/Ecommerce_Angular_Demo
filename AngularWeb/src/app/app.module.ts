import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routingModule, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ErrorComponent } from './components/error/error.component';
import { EsParPipe } from './pipes/espar.pipe';
import { FormsModule } from '@angular/forms';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { CarroComponent } from './components/carro/carro.component';
import { CarroItemComponent } from './components/carro-item/carro-item.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlogSidebarComponent } from './components/blog-sidebar/blog-sidebar.component';
import { TiendaSidebarComponent } from './components/tienda-sidebar/tienda-sidebar.component';
import { SearchcategorieComponent } from './components/searchcategorie/searchcategorie.component';
import { BannerComponent } from './components/banner/banner.component';
import { RelatedproductsComponent } from './components/relatedproducts/relatedproducts.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormularioComponent,
    HistoriaComponent,
    ErrorComponent,
    EsParPipe,
    TiendaComponent,
    ArticlesComponent,
    ArticleComponent,
    SearchComponent,
    CarroComponent,
    CarroItemComponent,
    CreateArticleComponent,
    ArticleEditComponent,
    LoginComponent,
    CategoriesComponent,
    BlogSidebarComponent,
    TiendaSidebarComponent,
    SearchcategorieComponent,
    BannerComponent,
    RelatedproductsComponent,
    
  ],
  imports: [
    BrowserModule,
    routingModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    AngularFileUploaderModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

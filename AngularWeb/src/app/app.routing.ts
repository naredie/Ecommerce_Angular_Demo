//importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes a los cuales les quiero hacer una pagina
import { HomeComponent } from './components/home/home.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BlogComponent } from './components/blog/blog.component';
import { ErrorComponent } from './components/error/error.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { LoginComponent } from './components/login/login.component';
import { SearchcategorieComponent } from './components/searchcategorie/searchcategorie.component';

//array de rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tienda/articulo/:id', component: ArticleComponent },
  { path: 'tienda/crear', component: CreateArticleComponent },
  { path: 'tienda/editar/:id', component: ArticleEditComponent },
  { path: 'contacto', component: FormularioComponent },
  { path: 'team', component: HistoriaComponent },
  { path: 'buscar/:search', component: SearchComponent },
  { path: 'buscarcategoria/:categorie', component: SearchcategorieComponent },
  { path: '**', component: ErrorComponent }
 
];

//Exportar el modulo de rutas para poder utilizarlo (es un servicio)
export const appRoutingProviders: any[] = [];
//esto carga todas las rutas que hemos definido en el archivo de routing de angular (es un modulo)
export const routingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);

import { environment } from 'src/environments/environment';

export var Global = {
  url: environment.production ? 'URL DE PRODUCCION' : 'http://localhost:3900/api/',
};


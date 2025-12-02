import { Routes } from '@angular/router';
import {CosmeticosList} from './components/web/cosmeticos/cosmeticos-list/cosmeticos-list';
import {CosmeticosDetail} from './components/web/cosmeticos/cosmeticos-detail/cosmeticos-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cosmeticos/list',
    pathMatch: 'full'
  },
  {
    path: 'cosmeticos/list',
    component: CosmeticosList
  },
  {
    path: 'cosmeticos/edit/:id',
    component: CosmeticosDetail
  },
  {
    path: 'cosmeticos/add',
    component: CosmeticosDetail
  },
  {
    path:'**',
    redirectTo: '/cosmeticos/list',
    pathMatch: 'full'
  }

];

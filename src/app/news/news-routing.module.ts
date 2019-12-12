import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListComponent } from './containers/news-list/news-list.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }

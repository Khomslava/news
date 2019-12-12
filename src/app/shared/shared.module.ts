import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgSelectModule,
    PaginationModule.forRoot()
  ],
  exports: [
    FormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    NgSelectModule,
    PaginationModule
  ]
})
export class SharedModule { }

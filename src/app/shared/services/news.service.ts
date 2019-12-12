import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { INews, INewsArticles } from './../models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  private apiKey = '9d4aeae4e81443579d2cbf91b32142a8';

  constructor(private http: HttpClient) { }

  getNews(queryParams): Observable<INews> {
    const params = this.createHttpQueryParams(queryParams);

    return this.http.get<INews>(`${this.apiUrl}?${params}`);
  }

  createHttpQueryParams(queryParams: { [key: string]: any }): HttpParams {
    return new HttpParams()
      .set('apiKey', this.apiKey)
      .set('pageSize', queryParams.pageSize || 10)
      .set('page', queryParams.page || 1)
      .set('country', queryParams.country)
      .set('category', queryParams.category)
      .set('q', queryParams.search);
  }
}

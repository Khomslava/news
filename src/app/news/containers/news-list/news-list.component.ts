import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { tap, map, catchError, takeWhile, debounceTime, distinctUntilChanged, take, filter } from 'rxjs/operators';
import { PageChangedEvent } from 'ngx-bootstrap';

import { NewsService } from './../../../shared/services';
import { INewsArticles, INews } from './../../../shared/models/news.model';
import { ECategories } from './../../../shared/consts/categories';
import { ECountries } from './../../../shared/consts/countries';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {

  newsArticles: Observable<any>;
  itemsPerPage = 5;
  totalArticles = 0;
  eCategories = ECategories;
  eCountries = ECountries;
  queryParams = {
    page: 1,
    pageSize: this.itemsPerPage,
    country: 'us',
    search: '',
    category: ''
  };
  filterForm = this.fb.group({
    country: [''],
    category: [''],
    search: ['']
  });

  private componentDestroyed = false;

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getNews();
    this.formValueChanges();
  }

  ngOnDestroy() {
    this.componentDestroyed = true;
  }

  pageChanged(event: PageChangedEvent): void {
    this.queryParams.page = event.page;
    this.getNews();
  }

  enumToKeys(en): string[] {
    return Object.keys(en);
  }

  trackByFn(index, item) {
    return index;
  }

  private getNews() {
    this.newsArticles = this.newsService.getNews(this.queryParams)
      .pipe(
      take(1),
      tap((news: INews) => this.totalArticles = news.totalResults),
      map((news: INews) => {
        if (news.articles && news.articles.length) {
          return news.articles;
        }
        return of([]);
      }),
      catchError(() => of([]))
      );
  }

  private formValueChanges() {
    this.filterForm
      .valueChanges
      .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(({ search }) => (this.queryParams.search !== search && (search === '' || search.length > 2)) || this.queryParams.search === search),
      takeWhile(() => !this.componentDestroyed),
    )
      .subscribe(({ search, country, category }) => {
        this.queryParams.search = search;
        this.queryParams.country = country;
        this.queryParams.category = category;
        this.queryParams.page = 1;
        this.getNews();
      });
  }

}

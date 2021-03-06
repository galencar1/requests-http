import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  result$!: Observable<any>;
  total!: number;
  fields = 'name,description,version,homepage';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.result$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params:{
          search: value,
          fields: this.fields
        }
      })),
      tap((res:any) => this.total = res.total),
      map((res:any)=> res.results)
    );
  }

  onSearch(){
    console.log(this.queryField.value);

    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;

      if (value && (value = value.trim()) !== ''){
        const params_ = {
          search: value,
          fields: fields
        }

        let params = new HttpParams();
        params = params.set('search', value );
        params = params.set('fields', fields);


      this.result$ = this.http.get(this.SEARCH_URL, { params })
      .pipe(
      tap((res:any) => this.total = res.total),
      map((res: any) => res.results)
      );
    }
  }
}

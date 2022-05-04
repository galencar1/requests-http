import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";
import { Curso } from "../cursos/curso";


export class CrudService<T> {



  constructor(protected http: HttpClient, private API_URL: string) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }
  loadByID(id: any) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }
  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: T) {
    return this.http.put(`${this.API_URL}/${record}`, record).pipe(take(1));
  }

  save(record: T) {
    if (record) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id:any) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}

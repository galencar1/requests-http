import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";


export class CrudService<T> {

  constructor(protected http: HttpClient, private API: string) { }

  list() {
    return this.http.get<T[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }
  loadByID(id:number) {
    return this.http.get<T>(`${this.API}/${id}`).pipe(take(1));
  }
  private create(record: T) {
    return this.http.post(this.API, record).pipe(take(1));
  }

  private update(record: T) {
    return this.http.put(`${this.API}/${record}`, record).pipe(take(1));
  }

  save(record: T) {
    if (record) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id:any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}

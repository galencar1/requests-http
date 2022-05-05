import { pipe } from 'rxjs';
import { map, tap,filter, } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse, HttpResponseBase, } from "@angular/common/http";


export function filterResponse<T>(){
  return pipe(
    filter(( event: HttpEvent<T>)=> event.type === HttpEventType.Response),
    //map((res: HttpResponse<T>) => res.body )
  );
}

export function uploadProgress<T>(cb:(progress: number) => void){
  return tap((event:  HttpEvent<T> )=>{
    if(event.type === HttpEventType.UploadProgress){
      const total:any = event.total;
      cb(Math.round((event.loaded * 100) / total));
    }
  });
}

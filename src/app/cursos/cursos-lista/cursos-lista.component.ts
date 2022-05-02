import { Component, OnInit } from '@angular/core';
import { catchError, empty, EmptyError, isEmpty, Observable, of, Subject } from 'rxjs';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject <boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //this.service.list()
    //.subscribe(dados => this.cursos = dados);
    this.onRefresh();

  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error =>{
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

}

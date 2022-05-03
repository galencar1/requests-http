
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, EmptyError, isEmpty, Observable, of, Subject } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];
  bsModalRef!: BsModalRef;
  cursos$!: Observable<Curso[]>;
  error$ = new Subject <boolean>();

  constructor(
    private service: CursosService,
    private modalService: BsModalService
    //private modalService:BsModalService ,
    ) { }

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
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }
  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent)
    this.bsModalRef.content.type = 'danger'
    this.bsModalRef.content.message = 'Erro ao Carregar cursos. Tente novamente mais tarde'
  }
}

import { switchMap, take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, empty, EmptyError, isEmpty, Observable, of, Subject } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];
  //bsModalRef!: BsModalRef;
  cursos$!: Observable<Curso[]>;
  error$ = new Subject <boolean>();
  cursoSelecionado!: Curso;
  deleteModalRef!: BsModalRef;

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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
    this.alertService.showAlertDanger('Erro ao Carregar cursos. Tente novamente mais tarde');
   // this.bsModalRef = this.modalService.show(AlertModalComponent)
   // this.bsModalRef.content.type = 'danger'
   // this.bsModalRef.content.message = 'Erro ao Carregar cursos. Tente novamente mais tarde'
  }

  onDelete(curso:any){
    this.cursoSelecionado = curso;
    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?', '')
    result$.asObservable().pipe(
      take(1),
      switchMap((result: any) => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();

      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');

      }
    )
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onEdit(id: any){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }
}

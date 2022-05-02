import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';
import { PocAsyncComponent } from './unsubscribe-rxjs/componentes/poc-async.component';
import { PocTakeUntilComponent } from './unsubscribe-rxjs/componentes/poc-take-until.component';
import { PocTakeComponent } from './unsubscribe-rxjs/componentes/poc-take.component';
import { PocUnsubComponent } from './unsubscribe-rxjs/componentes/poc-unsub.component';
import { PocComponent } from './unsubscribe-rxjs/componentes/poc.component';
import { PocBaseComponent } from './unsubscribe-rxjs/poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-rxjs/unsubscribe-poc/unsubscribe-poc.component';

import { UnsubscribeRxjsModule } from './unsubscribe-rxjs/unsubscribe-rxjs.module';


@NgModule({
  declarations: [
    AppComponent,
   
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

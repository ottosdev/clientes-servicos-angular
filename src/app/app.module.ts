import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { ClientesService } from './services/clientes.service';
import { ClientesModule } from './clientes/clientes.module';
import { TemplateModule } from './template/template.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicoPrestadoModule,
    HttpClientModule
  ],
  providers: [ClientesService ,{
    provide: LOCALE_ID, useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

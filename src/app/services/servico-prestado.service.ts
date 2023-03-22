import { ServicoPrestadoBusca } from './../clientes/clientes-lista/servicoPrestadoBusca';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './../servico-prestado/ServicosPrestados';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
@Injectable({
  providedIn: 'root',
})
export class ServicoPrestadoService {
  apiURL: string = enviroment.apiURL;
  constructor(private http: HttpClient) {}

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(
      `${this.apiURL}/servicos`,
      servicoPrestado
    );
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {
    if(!nome) nome = '';
    if(!mes) mes = 1;
    let params = new HttpParams().set('nome', nome).set('mes', mes.toString());

    let urlWithParams = this.apiURL + '/servicos?' + params;
    console.log(urlWithParams);
    return this.http.get<ServicoPrestadoBusca[]>(urlWithParams);
  }
}

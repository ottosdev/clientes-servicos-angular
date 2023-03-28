import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './../login/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = enviroment.apiURL + '/usuarios';
  tokenUrl: string = enviroment.apiURL + enviroment.obterTokenUrl;
  clienteID: string = enviroment.clienteId;
  clienteSecret: string = enviroment.clienteSecret;
  constructor(private http: HttpClient) {}

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clienteID}:${this.clienteSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };


    return this.http.post(this.tokenUrl, params.toString(), {
      headers,
    });
  }
}

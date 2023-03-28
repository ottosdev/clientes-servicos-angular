import { Usuario } from './usuario';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  loginError!: boolean;
  cadastrando!: boolean;
  mensagemSucesso!: string;
  errors: string[] = [];

  constructor(private router:Router, private authService: AuthService) {

  }

  onSubmit(): void {
    this.authService.tentarLogar(this.username, this.password).subscribe(res => {
      console.log(res)
       this.router.navigate(['/home']);

    }, err => {
      this.errors = ['Usuario e/ou senha incorretos.']
    })
  }

  preparaCadastrar(event: any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar(): void {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    console.log(usuario)
    this.authService.salvar(usuario).subscribe(res => {
      this.mensagemSucesso = 'Cadastro realizado com sucesso';
      this.errors = [];
      this.cadastrando = false
      this.username = '';
      this.password = '';
    }, err => {
      this.errors = err.error.erros;
      this.mensagemSucesso = '';
    })
  }
}

import { ClientesService } from './../../services/clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit{
  clientes: Cliente[] = [];
  clienteSelecionadoParaDelecao!: Cliente;
  mensagemSucesso!: string;
  mensagemError!: string;
  constructor(private service: ClientesService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.listarTodosOsClientes();
  }

  listarTodosOsClientes(): void {
    this.service.listar()?.subscribe(response => {
      this.clientes = response;
    } , err => {

    })
  }

  deletarCliente(id: number): void {
    this.service.deletar(id).subscribe(res => {
      this.mensagemSucesso = 'Cliente deletado com sucesso'
      this.listarTodosOsClientes();
    }, err => {
      this.mensagemError = 'Error ao deletar cliente'
    });

  }

  prepararDelecao(cliente: Cliente): void {
    this.clienteSelecionadoParaDelecao = cliente;
  }



  novoCadastro(): void {
    this.router.navigate(['/clientes/form'])
  }
}

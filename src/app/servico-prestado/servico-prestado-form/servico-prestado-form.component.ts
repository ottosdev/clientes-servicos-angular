import { ServicoPrestadoService } from './../../services/servico-prestado.service';
import { ServicoPrestado } from './../ServicosPrestados';
import { ClientesService } from './../../services/clientes.service';
import { Cliente } from './../../clientes/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css'],
})
export class ServicoPrestadoFormComponent implements OnInit {
  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success: boolean = false;
  erros: String[] = [];
  constructor(
    private serviceClientes: ClientesService,
    private servicoPrestado: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.serviceClientes.listar()?.subscribe((res) => {
      this.clientes = res;
    });
  }
  onSubmit() {
    this.servicoPrestado.salvar(this.servico).subscribe(res => {
      this.success = true;
      this.erros = [];
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.success = false;
      this.erros = errorResponse.error.erros;
    });
  }
}

import { ClientesService } from './../../services/clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent {
 cliente: Cliente;
 success: boolean = false;
 erros: String[] = [];

 constructor(private service: ClientesService) {
  this.cliente = new Cliente();
 }

  onSubmit(): void {
    this.service.salvar(this.cliente).subscribe( response => {
      this.success = true;
      this.erros = [];
      this.cliente = response;
    }, errorResponse => {
      this.success = false;
      this.erros = errorResponse.error.erros;
    });
  }
}

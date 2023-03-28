import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from './../../services/clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  erros: String[] = [];
  title: string = 'Cadastro';
  id!: number
  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.id = +id;
      this.title = 'Editando';
      this.buscarPorId(+id);
    }

  }


  buscarPorId(id: number): void {
    this.service.buscarPorId(id).subscribe(res => {
      this.cliente = res;
    }, err => {
      this.cliente = new Cliente();
    })
  }

  onSubmit(): void {
    if(this.id) {
      this.atualizarCliente();
    } else {
      this.salvarCliente();

    }
  }


  atualizarCliente() : void {
    console.log(this.cliente);
    this.service.atualizar(this.cliente).subscribe(response => {
      this.success = true;
      this.erros = [];
      this.voltar();
    }, err => {
      this.erros = ['Erro ao atualizar o cliente'];
    })
  }
  salvarCliente(): void {
    this.service.salvar(this.cliente).subscribe(
      (response) => {
        this.success = true;
        this.erros = [];
        this.cliente = response;
      },
      (errorResponse) => {
        this.success = false;
        this.erros = errorResponse.error.erros;
      }
    );
  }

  voltar(): void {
    this.router.navigate(['/clientes/listar']);
  }
}

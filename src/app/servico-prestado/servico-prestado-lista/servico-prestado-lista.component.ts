import { ServicoPrestadoService } from './../../services/servico-prestado.service';
import { ServicoPrestado } from './../ServicosPrestados';
import { ServicoPrestadoBusca } from './../../clientes/clientes-lista/servicoPrestadoBusca';
import { Component } from '@angular/core';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent {
  mes!: number;
  nome!: string;
  meses: number[] = []
  lista: ServicoPrestadoBusca[] = [];
  message!: string;
  constructor(private servicePrestadoBusca: ServicoPrestadoService) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]
  }

  consultar():void {
    this.servicePrestadoBusca.buscar(this.nome, this.mes)
    .subscribe(res => {
      this.lista = res;
      if(this.lista.length <= 0) {
        this.message = 'Nenhum resgistro encontrado'
      } else {
        this.message = '';
      }
    }, err => {

    })
  }
}

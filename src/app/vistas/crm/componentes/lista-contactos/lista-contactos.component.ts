import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../../servicios/clientes.service';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css']
})
export class ListaContactosComponent implements OnInit {
  contactos: any[] = []
  dataSource: any;

  constructor(private clienteService: ClientesService) { 
    this.contactos = []
    clienteService.obtenerDatos().subscribe(respuesta => {
      let lista = respuesta
      this.contactos = lista.contactos
    })
  }

  ngOnInit(): void {
    this.clienteService.obtenerDatos().subscribe(respuesta => {
      this.dataSource = respuesta as any
    })
  }

}

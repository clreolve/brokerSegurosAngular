import { Injectable } from '@angular/core';
import { Contactos } from '../interfaces/contactos';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  obtenerDatos() {
    const opciones = {
      headers : LoginComponent.tokenCookie,
    }
    return this.http.get<Contactos>('http://127.0.0.1:800/crm/api/login/', opciones)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

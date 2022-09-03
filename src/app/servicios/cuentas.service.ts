import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }

  obtenerDatos(username:string, password:string) {
    
    return this.http.get<Login>('http://127.0.0.1:800/crm/api/login/' + '?username='+ username + "&password=" + password)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

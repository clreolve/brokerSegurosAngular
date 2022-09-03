import {CookieService} from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../servicios/cuentas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public static tokenCookie:any
  username:string = ""
  password:string = ""
  token:string = ""


  constructor(private cookieService: CookieService, private cuentasService: CuentasService) { }

  ngOnInit(): void {
  }

  login(){
    this.cuentasService.obtenerDatos(this.username,this.password).subscribe(respuesta => {
      let datos = respuesta
      this.token = datos.token
    })
    this.cookieService.set('token', this.token);
    LoginComponent.tokenCookie = this.cookieService.get('token');
  }
}

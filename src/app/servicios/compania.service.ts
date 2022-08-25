import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICompania } from '../interfaces/compania';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor( private http:HttpClient,private router: Router) { }

  getAllCompanias():Observable<any>{
    return this.http.get<any>('https://medicalbrokers.pythonanywhere.com/web/compania/');
  }
  getbyCompaniaId(idCompania:number):Observable<any>{
    return this.http.get<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${idCompania}/`);
  }
  guardarCompania(compania:any){
    var body = {
      "nombrecompania": `${compania.nombrecompania}`,
      "ruc": `${compania.ruc}`,
      "nombrecoordinador": `${compania.nombrecoordinador}`,
      "celular": `${compania.celular}`,
      "correo": `${compania.correo}`
    }
    return this.http.post<any>('https://medicalbrokers.pythonanywhere.com/web/compania/',body);
    
    
  }
  actualizarCompania(compania:any){
    var body = {
      "nombrecompania": `${compania.nombrecompania}`,
      "ruc": `${compania.ruc}`,
      "nombrecoordinador": `${compania.nombrecoordinador}`,
      "celular": `${compania.celular}`,
      "correo": `${compania.correo}`
    }

    return this.http.put<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${compania.idcompania}/`,body);
  }

  inactivarCompania(idcompania:any){
    return this.http.delete<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${idcompania}/`);
  }
}

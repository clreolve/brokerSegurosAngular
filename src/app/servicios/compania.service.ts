import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ICompania } from '../interfaces/compania';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor( private http:HttpClient,private router: Router) { }

  getAllCompanias():Observable<any>{
    return this.http.get<any>('https://medicalbrokers.pythonanywhere.com/web/compania/');
  }
  obtenerCompaniaPorId(idCompania:number):Observable<any>{
    return this.http.get<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${idCompania}/`);
  }
  guardarCompania(compania:any){
    var body = {
      "nombreCompania": `${compania.nombreCompania}`,
      "ruc": `${compania.ruc}`,
      "nombreCoordinador": `${compania.nombreCoordinador}`,
      "celular": `${compania.celular}`,
      "correo": `${compania.correo}`,
      "is_active": 1
    }
    
    return this.http.post<any>('https://medicalbrokers.pythonanywhere.com/web/compania/',body);
    
    
  }
  actualizarCompania(compania:any){
    var body = {
      "nombreCompania": `${compania.nombreCompania}`,
      "ruc": `${compania.ruc}`,
      "nombreCoordinador": `${compania.nombreCoordinador}`,
      "celular": `${compania.celular}`,
      "correo": `${compania.correo}`,
      "is_active":1
    }

    return this.http.put<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${compania.idCompania}/`,body);
  }

  inactivarCompania(idcompania:any){
    return this.http.delete<any>(`https://medicalbrokers.pythonanywhere.com/web/compania/${idcompania}/`)
    .pipe(catchError(err=>throwError(()=> new Error('No se puede eliminar Compañias con datos asociados'))))
  }
}

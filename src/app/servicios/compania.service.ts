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
  guardarCompania(compania:any):any{
    //this.router.navigate(['compania']);
    return this.http.post('https://medicalbrokers.pythonanywhere.com/web/compania/',compania);

    /*this.http.post("https://medicalbrokers.pythonanywhere.com/web/compania/",compania)
    .subscribe(
    data => {
    console.log("PUT Request is successful ", data);
    },
    error => {
    console.log("Rrror", error);
    }
    );*/
    
  }
  actualizarCompania(compania:any){
    //pendiente
  }
}

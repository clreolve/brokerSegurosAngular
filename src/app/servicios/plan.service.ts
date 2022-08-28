import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url:string ='https://medicalbrokers.pythonanywhere.com/web/plan/';

  constructor(private http:HttpClient,private router: Router) { }

  obtenerTodosLosPlanes():Observable<any>{
    return this.http.get<any>(this.url);
  }

  obtenerPlanesPorId(id:number):Observable<any>{
    return this.http.get<any>(this.url+"/"+id);
  }

  eliminarPlan(idPlan:number){
    //codigo
  }

  actualizarPlan(plan:any){
    //codigo
  }



}

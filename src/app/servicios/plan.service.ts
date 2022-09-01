import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url:string ='https://medicalbrokers.pythonanywhere.com/web/plan/';

  constructor(private http:HttpClient,private router: Router) { }

  obtenerTodosLosPlanes():Observable<any>{
    return this.http.get<any>(this.url);
  }

  crearPlan(plan:any){
    var body = {
        "tipoDePlan": `${plan.tipoDePlan}`,
        "tipoDeSeguro": `${plan.tipoDeSeguro}`,
        "nombrePlan": `${plan.nombrePlan}`,
        "tieneLimite": `${plan.tieneLimite}`,
        "cobertura": `${plan.cobertura}`,
        "idCompania": `${plan.idCompania}`,
        "is_active" : 1
    }
    return this.http.post<any>(this.url,body);
  }

  obtenerPlanesPorId(id:number):Observable<any>{
    return this.http.get<any>(this.url+""+id+"/");
  }

  eliminarPlan(idPlan:number){
    return this.http.delete<any>(this.url+idPlan+"/")
    .pipe(catchError(err=>throwError(()=> new Error('No se puede eliminar el Plan con datos asociados'))))
  }

  actualizarPlan(plan:any){
    var body = {
      "tipoDePlan": plan.tipoDePlan,
      "tipoDeSeguro": plan.tipoDeSeguro,
      "nombrePlan": plan.nombrePlan,
      "tieneLimite": plan.tieneLimite,
      "cobertura": plan.cobertura,
      "is_active" : 1
    }

    return this.http.put<any>(this.url+plan.idPlan+"/",body);
  }



}

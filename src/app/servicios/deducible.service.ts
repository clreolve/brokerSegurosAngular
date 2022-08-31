import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeducibleService {

  url:string ='https://medicalbrokers.pythonanywhere.com/web/deducible/';

  constructor(private http:HttpClient,private router: Router) { }

  obtenerTodosLosDeducibles():Observable<any>{
    return this.http.get<any>(this.url);
  }

  obtenerDeduciblePorId(id:number):Observable<any>{
    return this.http.get<any>(this.url+""+id+"/");
  }

  eliminarDeducible(id:number){
    return this.http.delete<any>(this.url+id+"/");
  }

  crearDeducible(idPlan:number,datos:any){
   
      var body = {
        "tipoDeducible": `${datos.tipoDeducible}`,
        "valor": `${datos.deducible}`,
        "is_active": 1,
        "idPlan": `${idPlan}`
    }
  return this.http.post<any>(this.url,body);
    
    
  }

  actualizarDeducible(deducible:any){
    var body = {
      "tipoDeducible": `${deducible.tipoDeducible}`,
      "valor": `${deducible.valor}`,
      "is_active": 1,
      "idPlan": `${deducible.idPlan}`
  }

    return this.http.put<any>(this.url+deducible.idPlan+"/",body);
  }

}

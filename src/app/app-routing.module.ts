import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniaComponent } from './vistas/compania/compania.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { ClienteComponent } from './vistas/cliente/cliente.component';
import { PlanComponent } from './vistas/plan/plan.component';
import { AgregarCompaniaComponent } from './vistas/agregar-compania/agregar-compania.component';
import { AgenteComponent } from './vistas/agente/agente.component';
import { AgregarClienteComponent } from './vistas/agregar-cliente/agregar-cliente.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "principal", component: PrincipalComponent},
  {path: "compania", component: CompaniaComponent},
  {path: "cliente", component: ClienteComponent},
  {path: "plan", component: PlanComponent},
  {path: "agente", component: AgenteComponent},
  {path: "datos_compania", component: AgregarCompaniaComponent},
  {path: "datos_cliente", component: AgregarClienteComponent},
  {path: "**", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

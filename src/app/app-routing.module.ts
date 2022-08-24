import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniaComponent } from './vistas/compania/compania.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { ClienteComponent } from './vistas/cliente/cliente.component';
import { PlanComponent } from './vistas/plan/plan.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "principal", component: PrincipalComponent},
  {path: "compania", component: CompaniaComponent},
  {path: "cliente", component: ClienteComponent},
  {path: "plan", component: PlanComponent},
  {path: "**", redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

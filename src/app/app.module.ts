import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { CompaniaComponent } from './vistas/compania/compania.component';
import { HeaderComponent } from './vistas/componentes/header/header.component';
import { SidebarmenuComponent } from './vistas/componentes/sidebarmenu/sidebarmenu.component';
import { ClienteComponent } from './vistas/cliente/cliente.component';
import { PlanComponent } from './vistas/plan/plan.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AgenteComponent } from './vistas/agente/agente.component';
import { AgregarCompaniaComponent } from './vistas/agregar-compania/agregar-compania.component';
import { AgregarClienteComponent } from './vistas/agregar-cliente/agregar-cliente.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SitioEnConstruccionComponent } from './vistas/componentes/sitio-en-construccion/sitio-en-construccion.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { ActualizarCompaniaComponent } from './vistas/actualizar-compania/actualizar-compania.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './vistas/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AgregarPlanComponent } from './vistas/agregar-plan/agregar-plan.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CompaniaComponent,
    HeaderComponent,
    SidebarmenuComponent,
    ClienteComponent,
    PlanComponent,
    AgenteComponent,
    AgregarCompaniaComponent,
    AgregarClienteComponent,
    SitioEnConstruccionComponent,
    DashboardComponent,
    ActualizarCompaniaComponent,
    DialogoConfirmacionComponent,
    AgregarPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatTableExporterModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports:[
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatTableExporterModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class AppModule { }

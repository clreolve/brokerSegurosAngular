import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPlan } from 'src/app/interfaces/IPlan';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { DeducibleService } from 'src/app/servicios/deducible.service';
import { PlanService } from 'src/app/servicios/plan.service';
import { DialogoConfirmacionComponent } from '../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

interface limitePlan{
  valor:number,
  etiqueta: string
}

@Component({
  selector: 'app-actualizar-plan',
  templateUrl: './actualizar-plan.component.html',
  styleUrls: ['./actualizar-plan.component.css']
})
export class ActualizarPlanComponent implements OnInit {

  deducibles = {
    "idDeducible": 0,
    "tipoDeducible": "",
    "valor": "",
    "is_active": 0,
    "fecha_creado": null,
    "creado_por_usuario": null,
    "creado_id_usuario": null,
    "fecha_modificado": null,
    "modificado_por_usuario": null,
    "modificado_id_usuario": null,
    "idPlan": 0
}

  planDatos= {
    "idPlan": 0,
    "deducibles":[this.deducibles],
    "tipoDePlan": "",
    "tipoDeSeguro": "",
    "nombrePlan": "D",
    "tieneLimite": 0,
    "cobertura": 0,
    "is_active": 1,
    "fecha_creado": null,
    "creado_por_usuario": null,
    "creado_id_usuario": null,
    "fecha_modificado": null,
    "modificado_por_usuario": null,
    "modificado_id_usuario": null,
    "idCompania": 0
  }

  registerForm: FormGroup;
  submitted = false;

  limites: limitePlan[] = [
    {valor: 1, etiqueta: "Si"},
    {valor: 0, etiqueta: "No"}
  ];

  tipoSeguro: any[] = [
    {valor: "Medico", etiqueta: "Medico"},
    {valor:"Vehicular", etiqueta: "Vehicular"}
  ];

  listaCompanias: any[] = [];

  constructor(private _companiaService: CompaniaService,private formBuilder: FormBuilder,private _deducibleService: DeducibleService, 
    private router:Router, private _planService: PlanService,private _snackBar: MatSnackBar,private rutaActiva: ActivatedRoute,public dialogo: MatDialog) { 

    this.registerForm = this.formBuilder.group({
      idPlan: 0,
      tipoDePlan: ["",Validators.required],
      tipoDeSeguro: ["",Validators.required],
      nombrePlan: ["",Validators.required],
      tieneLimite: ["",Validators.required],
      cobertura: ["",Validators.required],
      idCompania: ["",Validators.required],
      deducible: ["",Validators.min(1)],
      tipoDeducible: [""]
  });

  }

  ngOnInit(): void {
    
    this.cargarInformacion();

  }

  cargarInformacion(){
    this._companiaService.getAllCompanias().subscribe(data=>{
      this.listaCompanias = data;
    })
    this.rutaActiva.params.subscribe(
      (params: Params)=>{
        this._planService.obtenerPlanesPorId(params['id']).subscribe(data=>{
          this.planDatos = data;
        });
        
      }
    );
  }

  get form(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.actualizarDatosPlan();
  }

  actualizarDatosPlan(){
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Se guardaran los cambios, Continuar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.submitted = true;
          //en caso que el formulario no es valido
          if (this.registerForm.invalid) {
            return;
          }

          this._planService.actualizarPlan(this.registerForm.value)
            .subscribe(response => {
              this.mensaje('Actualizado Correctamente');

            })
        }
      });

  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }

  mensaje(mensaje:string){
    this._snackBar.open(mensaje,'',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  eliminarDeducible(id:number){
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Se eliminará el deducible, Continuar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this._deducibleService.eliminarDeducible(id)
          .subscribe(
            response=>{
              this.cargarInformacion();
              this.mensaje("Deducible eliminado correctamente");
              },
              error =>{
                this.mensaje(error.error);
              }
          )
        } 
      });
  }

  crearDeducible(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Se agregará un nuevo deducible`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this._deducibleService.crearDeducible(this.planDatos.idPlan,this.registerForm.value)
          .subscribe(response=>{
            this.cargarInformacion();
            }
          )
          
        } 
      });
  }

}

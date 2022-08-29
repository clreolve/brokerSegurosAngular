import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IPlan } from 'src/app/interfaces/IPlan';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { PlanService } from 'src/app/servicios/plan.service';

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

  planDatos= {
    "idPlan": 0,
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

  listaCompanias: any[] = [];

  constructor(private _companiaService: CompaniaService,private formBuilder: FormBuilder, private router:Router, private _planService: PlanService,private _snackBar: MatSnackBar,private rutaActiva: ActivatedRoute) { 

    this.registerForm = this.formBuilder.group({
      idPlan: 0,
      tipoDePlan: ["",Validators.required],
      tipoDeSeguro: ["",Validators.required],
      nombrePlan: ["",Validators.required],
      tieneLimite: ["",Validators.required],
      cobertura: ["",Validators.required],
      idCompania: ["",Validators.required],
  });

  }

  ngOnInit(): void {
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
    this.submitted = true;
    //en caso que el formulario no es valido
    if(this.registerForm.invalid){
      return;
    }

    this._planService.actualizarPlan(this.registerForm.value)
    .subscribe(response=>{
      this.mensaje();
      
    })

  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }

  mensaje(){
    this._snackBar.open('Datos actualizados correctamente','',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}

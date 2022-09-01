import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { PlanService } from 'src/app/servicios/plan.service';
import { DialogoConfirmacionComponent } from '../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

interface limitePlan{
  valor:number,
  etiqueta: string
}

@Component({
  selector: 'app-agregar-plan',
  templateUrl: './agregar-plan.component.html',
  styleUrls: ['./agregar-plan.component.css']
})
export class AgregarPlanComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private router:Router,public dialogo: MatDialog,
    private _planService: PlanService,private _snackBar: MatSnackBar, private _companiaService:CompaniaService) {

      this.registerForm = this.formBuilder.group({
          tipoDePlan: ["",Validators.required],
          tipoDeSeguro: ["",Validators.required],
          nombrePlan: ["",Validators.required],
          tieneLimite: ["",Validators.required],
          cobertura: ["",Validators.required],
          idCompania: ["",Validators.required],
      });

      


  }

   get form(){
    return this.registerForm.controls;
    }

  ngOnInit(): void {
    this._companiaService.getAllCompanias().subscribe(data=>{
      this.listaCompanias = data;
    })
  }

  onSubmit(){
    this.guardarDatosPlan();
  }

  guardarDatosPlan(){
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Se guardara el nuevo Plan, Continuar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.submitted = true;
    //en caso que el formulario no es valido
    if(this.registerForm.invalid){
      return;
    }
    this._planService.crearPlan(this.registerForm.value)
    .subscribe(
      response=>{
      this.registerForm.reset();
      this.mensajeOk('Plan guardado correctamente');
      },
      error =>{
        this.mensajeError(error.error.nombrePlan);
      } 
    )
        }
      });
  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }
  mensajeOk(texto:string){
    this.router.navigate(['plan']);
    this._snackBar.open(texto,'',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  mensajeError(texto:string){
    this._snackBar.open(texto,'',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}

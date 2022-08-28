import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { ICompania } from 'src/app/interfaces/compania';

@Component({
  selector: 'app-actualizar-compania',
  templateUrl: './actualizar-compania.component.html',
  styleUrls: ['./actualizar-compania.component.css']
})
export class ActualizarCompaniaComponent implements OnInit {

  companiaDatos: ICompania = {
    idCompania: 0,
    nombreCompania: "",
    ruc: "",
    nombreCoordinador: "",
    celular: "",
    correo: "",
    is_active: 1
  };

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router:Router, private _companiaService: CompaniaService,private _snackBar: MatSnackBar,private rutaActiva: ActivatedRoute) { 

    this.registerForm = this.formBuilder.group(
      {
        idCompania: [0],
        nombreCompania: ["",Validators.required],
        ruc: ["",[Validators.required,Validators.pattern('^[0-9]{13}$')]],
        nombreCoordinador: ["",Validators.required],
        celular: ["",[Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]{10}$')]],
        correo: ["",[Validators.required,Validators.email]]
    }
    );
    
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params)=>{
        this.companiaDatos.nombreCompania = params['nombre'];
        this.companiaDatos.celular = params['celular'];
        this.companiaDatos.correo = params['correo'];
        this.companiaDatos.ruc = params['ruc'];
        this.companiaDatos.nombreCoordinador = params['coordinador'];
        this.companiaDatos.idCompania = params['id'];
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

    this._companiaService.actualizarCompania(this.registerForm.value)
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

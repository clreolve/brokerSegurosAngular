import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompaniaService } from 'src/app/servicios/compania.service';

@Component({
  selector: 'app-agregar-compania',
  templateUrl: './agregar-compania.component.html',
  styleUrls: ['./agregar-compania.component.css']
})
export class AgregarCompaniaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router:Router, private _companiaService: CompaniaService,private _snackBar: MatSnackBar) { 
    this.registerForm = this.formBuilder.group(
      {
        nombrecompania: ["",Validators.required],
        ruc: ["",Validators.required],
        nombrecoordinador: ["",Validators.required],
        celular: ["",[Validators.required,Validators.minLength(10)]],
        correo: ["",[Validators.required,Validators.email]]
    }
    );
  }

  ngOnInit(): void {
    
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

    this._companiaService.guardarCompania(this.registerForm.value)
    .subscribe(response=>{
      this.registerForm.reset();
      this.mensaje();

    })
    

  }

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }

  mensaje(){
    this._snackBar.open('Compañia guardada correctamente','',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}

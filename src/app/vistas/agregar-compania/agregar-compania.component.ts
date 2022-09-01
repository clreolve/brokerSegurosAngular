import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { DialogoConfirmacionComponent } from '../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-agregar-compania',
  templateUrl: './agregar-compania.component.html',
  styleUrls: ['./agregar-compania.component.css']
})
export class AgregarCompaniaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,public dialogo: MatDialog, private router:Router, private _companiaService: CompaniaService,private _snackBar: MatSnackBar) { 
    this.registerForm = this.formBuilder.group(
      {
        nombreCompania: ["",Validators.required],
        ruc: ["",[Validators.required,Validators.minLength(10),Validators.maxLength(13),Validators.pattern('^[0-9]{13}$')]],
        nombreCoordinador: ["",Validators.required],
        celular: ["",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]{10}$')]],
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
    this.guardarDatosCompania();
  }

  guardarDatosCompania() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Se guardará una nueva compañia, Continuar?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.submitted = true;
          //en caso que el formulario no es valido
          if (this.registerForm.invalid) {
            return;
          }

          this._companiaService.guardarCompania(this.registerForm.value)
            .subscribe(
              response => {
                this.registerForm.reset();
                this.mensajeOk('Compañia guardada correctamente');
              },
              error => {
                this.mensajeError(error.error.ruc);
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
    this.router.navigate(['compania']);
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

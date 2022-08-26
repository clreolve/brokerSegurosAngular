import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from 'src/app/servicios/plan.service';
import { IPlan } from 'src/app/interfaces/IPlan';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogoConfirmacionComponent } from '../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit, AfterViewInit {

  listaPlanes: IPlan[] = [];

  displayedColumns: string[] = ['nombrePlan', 'idCompania', 'tipoDePlan', 'numeroDeducibles','cobertura','acciones'];

  dataSource!: MatTableDataSource<any>;

  dataTable!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _planService: PlanService,public dialogo: MatDialog,private _snackBar: MatSnackBar, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    //TODO
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarPlanes(){
    //Codigo
  }

  mostrarDialogo(id:string): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de eliminar el plan?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //llamar funcion desactivarPlan
        } 
      });
  }

  desactivarPlan(id:string){
    
  }

  mensaje(){
    this._snackBar.open('Plan fue eliminado','',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
  
}

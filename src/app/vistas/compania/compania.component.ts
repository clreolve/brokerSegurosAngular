import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICompania } from 'src/app/interfaces/compania';
import { CompaniaService } from 'src/app/servicios/compania.service';
import { DialogoConfirmacionComponent } from '../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.css']
})
export class CompaniaComponent implements OnInit, AfterViewInit {

  listaCompanias: ICompania[] = [];

  displayedColumns: string[] = ['nombrecompania', 'ruc', 'nombrecoordinador', 'celular','correo','acciones'];

  dataSource! : MatTableDataSource<any>;

  dataTable! : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  constructor(private _companiaService : CompaniaService,public dialogo: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarCompanias();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarCompanias(){
    this._companiaService.getAllCompanias().subscribe(data=>{
      this.listaCompanias = data;
      this.dataSource = new MatTableDataSource(this.listaCompanias);
    })
  }

  mostrarDialogo(id:string): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de eliminar la compañía?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.desactivarCompania(id);
        } 
      });
  }

  desactivarCompania(id:string){
    this._companiaService.inactivarCompania(id)
    .subscribe(response=>{
      this.cargarCompanias();
      this.mensaje();
    })
  }

  mensaje(){
    this._snackBar.open('Compañia fue eliminada','',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}

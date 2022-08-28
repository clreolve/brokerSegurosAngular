import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort,SortDirection } from '@angular/material/sort';
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

  dataSource!: MatTableDataSource<any>;

  dataTable!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _companiaService : CompaniaService,public dialogo: MatDialog,private _snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cargarCompanias();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarCompanias(){
    this._companiaService.getAllCompanias().subscribe(data=>{
      //console.log(data);
      this.listaCompanias = data;
      this.dataSource = new MatTableDataSource(this.listaCompanias);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    //TODO
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

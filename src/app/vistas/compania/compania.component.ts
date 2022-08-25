import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICompania } from 'src/app/interfaces/compania';
import { CompaniaService } from 'src/app/servicios/compania.service';

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

  constructor(private _companiaService : CompaniaService) { }

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

  desactivarCompania(i:number){

  }

}

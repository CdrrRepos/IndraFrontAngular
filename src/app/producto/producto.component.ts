import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../Services/producto.services';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  nombre: string = "";
  descripcion: string = "";
  categoria: string = "";
  url: string = "";

  idUp: number = 0;
  nombreUp: string = "";
  descripcionUp: string = "";
  categoriaUp: string = "";
  urlUp: string = "";

  data:{} = {};
  
  ALL_DATA: responseProducto[] = [
    {id_Producto: 1, nombre: 'Hydrogen', descripcion: '1.0079', categoria: 'H', imagen_Url: 'https://918230.smushcdn.com/2283449/wp-content/uploads/2020/05/coca-cola.jpg?lossy=1&strip=1&webp=1', AccionId: ''},
    {id_Producto: 2, nombre: 'Helium', descripcion: '4.0026', categoria: 'He', imagen_Url: 'https://918230.smushcdn.com/2283449/wp-content/uploads/2020/05/coca-cola.jpg?lossy=1&strip=1&webp=1', AccionId: ''},
  ];

  displayedColumns: string[] = ['id_Producto', 'nombre', 'descripcion', 'categoria', 'imagen_Url'];
  dataSource = new MatTableDataSource<responseProducto>(this.ALL_DATA);
  displayedSearchColumns: string[] = ['id_Producto', 'nombre', 'descripcion', 'categoria', 'imagen_Url', 'AccionId'];
  dataSearchSource = new MatTableDataSource<responseProducto>(this.ALL_DATA);

  constructor(private _snackBar: MatSnackBar,
    public productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  @ViewChild('MatPaginator1') paginator!: MatPaginator;
  @ViewChild('MatPaginator2') paginatorSearch!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSearchSource.paginator = this.paginatorSearch;
  }

  
  public async guardar() {

    if (this.nombre == "" || this.nombre == undefined || this.nombre == null) {
      this.mensaje(' nombre', 1);
      return;
    }
    if (this.descripcion == "" || this.descripcion == undefined || this.descripcion == null) {
      this.mensaje('a descripcion', 1);
      return;
    }
    if (this.categoria == "" || this.categoria == undefined || this.categoria == null) {
      this.mensaje('a categoria', 1);
      return;
    }
    if (this.url == "" || this.url == undefined || this.url == null) {
      this.mensaje('a url', 1);
      return;
    }

    this.data = { Nombre: this.nombre, Descripcion: this.descripcion, Categoria: this.categoria, Imagen_Url: this.url };
    //console.log(this.data);
    (await this.productoService.registroProducto(this.data)).subscribe((response: any) => {
      //console.log(response);
      if(response.id_Producto > 0){
        this.mensaje(response.Nombre + ' con Id: ' + response.id_Producto, 3);
      }else{
        this.mensaje(response, 2);
      }
      this.limpiarCampos();
      this.obtenerDatos();
    }, (errorResponse: any) => {
      console.clear();
      //console.log("Se presento un error al realizar la consulta: " + errorResponse.error.error);
      this.mensaje(errorResponse.error.error, 2);
    });
  }

  public mensaje(texto: string, accion: number) {
    var mensaje;

    switch (accion) {
      case 1:
        mensaje = 'Ingrese un' + texto + ' para el producto';
        break;
      case 2:
        mensaje = 'Se presento un error: ' + texto;
        break;
      case 3:
        mensaje = 'Se inserto el producto: ' + texto;
        break;
      case 4:
        mensaje = texto;
        break;
      case 5:
        mensaje = 'Se actualizo el producto: ' + texto;
        break;
      default:
        mensaje = 'Algo no a salido muy bien, si persiste comuniquese con el administrador';
        break;
    }

    this._snackBar.open(mensaje, 'X', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public limpiarCampos() {
    this.nombre = "";
    this.descripcion = "";
    this.categoria = "";
    this.url = "";
    
    this.nombreUp = "";
    this.descripcionUp = "";
    this.categoriaUp = "";
    this.urlUp = "";
  }

  public async obtenerDatos(){
    (await this.productoService.obtenerTodosProductos()).subscribe((response: any) => {
      //console.log(response);
      this.ALL_DATA = response.data;
      this.dataSource = new MatTableDataSource<responseProducto>(this.ALL_DATA);
      this.dataSearchSource = new MatTableDataSource<responseProducto>(this.ALL_DATA);
      this.ngAfterViewInit();
    }, (errorResponse: any) => {
      console.clear();
      this.mensaje(errorResponse.error.error, 2);
    });
  }

  
  public async actualizar() {

    if (this.idUp == 0 || this.idUp == undefined || this.idUp == null) {
      this.mensaje('Antes de realizar una modificacion seleccione un producto', 4);
      return;
    }
    if (this.nombreUp == "" || this.nombreUp == undefined || this.nombreUp == null) {
      this.mensaje(' nombre', 1);
      return;
    }
    if (this.descripcionUp == "" || this.descripcionUp == undefined || this.descripcionUp == null) {
      this.mensaje('a descripcion', 1);
      return;
    }
    if (this.categoriaUp == "" || this.categoriaUp == undefined || this.categoriaUp == null) {
      this.mensaje('a categoria', 1);
      return;
    }
    if (this.urlUp == "" || this.urlUp == undefined || this.urlUp == null) {
      this.mensaje('a url', 1);
      return;
    }

    this.data = { id_Producto: this.idUp, Nombre: this.nombreUp, Descripcion: this.descripcionUp, Categoria: this.categoriaUp, Imagen_Url: this.urlUp, Estado: true };
    //console.log(this.data);
    (await this.productoService.actualizarProducto(this.idUp, this.data)).subscribe((response: any) => {
      //console.log(response);
      this.mensaje(this.nombreUp + ' con Id: ' + this.idUp, 5);
      this.limpiarCampos();
      this.obtenerDatos();
    }, (errorResponse: any) => {
      console.clear();
      //console.log("Se presento un error al realizar la consulta: " + errorResponse.error.error);
      this.mensaje(errorResponse.error.error, 2);
    });
  }

  public llenarCampos(element: any){
    //console.log(element);
    this.idUp = element.id_Producto;
    this.nombreUp = element.nombre;
    this.descripcionUp = element.descripcion;
    this.categoriaUp = element.categoria;
    this.urlUp = element.imagen_Url;
  }

  public obtenerDatosFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSearchSource.filter = filterValue.trim().toLowerCase();
  }


  public async eliminar(idUp: number) {

    if (idUp == 0 || idUp == undefined || idUp == null) {
      this.mensaje('Se presenta una falla al eliminar', 4);
      return;
    }

    //console.log(this.data);
    (await this.productoService.eliminarProducto(idUp)).subscribe((response: any) => {
      //console.log(response);
      this.mensaje('El producto se ha eliminado', 4);
      this.limpiarCampos();
      this.obtenerDatos();
    }, (errorResponse: any) => {
      console.clear();
      //console.log("Se presento un error al realizar la consulta: " + errorResponse.error.error);
      this.mensaje(errorResponse.error.error, 2);
    });
  }

}

export interface responseProducto {
  id_Producto: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen_Url: string;
  AccionId: string;
}


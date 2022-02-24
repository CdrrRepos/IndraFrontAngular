import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  constructor( public http: HttpClient) { }

  url: string = "https://localhost:44373/api/";

  public registroProducto(object: any) {
    
    try {
      return this.http.post(this.url + 'Producto', JSON.stringify(object), {
        headers:new HttpHeaders().set('Content-Type','application/json')
      }).pipe(
        map( (data: any) => {
          return data;
        } )
      );
    } catch (error) {
      throw(error);
    }

  }

  public obtenerTodosProductos() {
    
    try {
        return this.http.get(this.url + 'Producto/GetProducto', {
          headers:new HttpHeaders().set('Content-Type','application/json')
        }).pipe(
          map( (data: any) => {
            return data;
          } )
        );
      } catch (error) {
        throw(error);
      }

  }

  public obtenerProductoID(id: number) {
    
    try {
        return this.http.get(this.url + 'Producto/GetProducto/' + id, {
          headers:new HttpHeaders().set('Content-Type','application/json')
        }).pipe(
          map( (data: any) => {
            return data;
          } )
        );
      } catch (error) {
        throw(error);
      }

  }

  public actualizarProducto(id: number, object: any) {
    
    try {
      //return this.http.put(this.url + 'Producto/' + id, JSON.stringify(object), {
      return this.http.put(this.url + 'Producto', JSON.stringify(object), {
        headers:new HttpHeaders().set('Content-Type','application/json')
      }).pipe(
        map( (data: any) => {
          return data;
        } )
      );
    } catch (error) {
      throw(error);
    }

  }

  public eliminarProducto(id: number) {
    
    try {
      return this.http.delete(this.url + 'Producto/' + id).pipe(
        map( (data: any) => {
          return data;
        } )
      );
    } catch (error) {
      throw(error);
    }

  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/usuarios';


  //FIREBASE
  // GET: Obtener todos los usuarios
  // getUsuarios(): Observable<Usuario[]> {
  //   return this.http.get<{ [key: string]: Usuario }>(`${this.API_URL}/usuarios.json`).pipe(
  //     map(respuesta => {
  //       if (!respuesta) return [];
  //       return Object.keys(respuesta).map(id => ({
  //         ...respuesta[id],
  //         id: id
  //       }));
  //     })
  //   );
  // }

  //METODO GEET 
  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL)
  }

  //METODO POST
  postUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}/registrarUsuario`, usuario);
  }

  //metodo buscar POR ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`);
  }

  // PUT: Actualizar usuario
  putUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, usuario);
  }

  // DELETE: Eliminar usuario
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
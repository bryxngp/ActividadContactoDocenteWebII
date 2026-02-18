import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private API_URL = 'https://app-crude-834ac-default-rtdb.firebaseio.com';

  // GET: Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ [key: string]: Usuario }>(`${this.API_URL}/usuarios.json`).pipe(
      map(respuesta => {
        if (!respuesta) return [];
        return Object.keys(respuesta).map(id => ({
          ...respuesta[id],
          id: id
        }));
      })
    );
  }

  //METODO POST
  postUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios.json`, usuario);
  }

  //metodo buscar POR ID
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/usuarios/${id}.json`);
  }

  // PUT: Actualizar usuario
  putUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/usuarios/${id}.json`, usuario);
  }

  // DELETE: Eliminar usuario
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/usuarios/${id}.json`);
  }
}
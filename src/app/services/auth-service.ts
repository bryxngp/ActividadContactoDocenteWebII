import { inject, Injectable, signal } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { UsuarioService } from './usuario-service';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioService);
  private http = inject(HttpClient);

  //LOCAL STORAGE
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion') === 'true');

  usuario: User | null = null;

  confirmarCierre = signal<boolean>(false);



  //private auth = getAuth();

  /*login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(respuesta => this.usuario = respuesta.user)
      .catch(err => console.error('No puede iniciar Sesion', err.message))
  }*/

  //Accedemos al rol del usuario
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  private API_URL = 'http://localhost:8080/login';

  login(email: string, passw: string): Observable<boolean> {
    return this.http.post<Usuario | null>(this.API_URL, { email, password: passw }).pipe(
      map(usuarioCoincide => {
        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true');
          //guardar los datos convirtiendo el objeto json a texto
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));

          localStorage.setItem('rol', usuarioCoincide.rol);
          this.rolActual.set(usuarioCoincide.rol);

          this.sesionIniciada.set(true);
          return true;
        }
        return false;
      })
    )
  }

  logout() {
    /*signOut(this.auth);
    this.usuario = null;*/

    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.sesionIniciada.set(false)

    this.rolActual.set(null);

    this.confirmarCierre.set(false);
  }
}

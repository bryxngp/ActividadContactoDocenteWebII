import { inject, Injectable, signal } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { UsuarioService } from './usuario-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioService);

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


  //ACCEDEMS AL ROL DEL USUARIO
  rolActual = signal<string | null>(localStorage.getItem('rol'))

  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios => {
        const usuarioCoincide = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioCoincide) {
          localStorage.setItem('sesion', 'true')

          //GUARDAR ESTOS DATOS CONVERTIENDO EL OBJETO JSON A TEXTO
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));

          //Guardar el rol
          localStorage.setItem('rol', usuarioCoincide.rol)

          this.rolActual.set(usuarioCoincide.rol);

          this.sesionIniciada.set(true);

          this.confirmarCierre.set(false);
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

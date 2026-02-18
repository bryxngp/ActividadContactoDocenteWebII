import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Acerca } from './features/acerca/acerca';
import { Consultas } from './features/consultas/consultas';
import { Usuarios } from './features/usuarios/usuarios';
import { Mascotas } from './shared/mascotas/mascotas';
import { FormularioCuenta } from './shared/formulario-cuenta/formulario-cuenta';
import { Login } from './shared/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    //1.Ruta Inicial
    {path:'', component:Home},
    //2.Rutas de navegacion
    {path:'acerca', component:Acerca},
    //3. Redireccin si el usuario escribe una url que no existe
    //{path:'**', component: Pagina404} se debe crear la pagina 404
    {path:'consultas', component:Consultas},

    {path:'mascotas', component:Mascotas},

    {path:'usuarios', component:Usuarios , canActivate:[authGuard]},

    {path:'cuenta', component:FormularioCuenta},

    {path:'login', component:Login},

];

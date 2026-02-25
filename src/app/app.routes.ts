import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Acerca } from './features/acerca/acerca';
import { Consultas } from './features/consultas/consultas';
import { Usuarios } from './features/usuarios/usuarios';
import { Mascotas } from './shared/mascotas/mascotas';
import { FormularioCuenta } from './shared/formulario-cuenta/formulario-cuenta';
import { Login } from './shared/login/login';
import { authGuard } from './guards/auth-guard';
import { outAuthGuard } from './guards/out-auth-guard';
import { childGuardGuard } from './guards/child-guard-guard';
import { adminMatchGuard, empleadoMatchGuard, publicMatchGuard } from './guards/match-guard';

export const routes: Routes = [

    { path: '', component: Home, canMatch:[publicMatchGuard] },

    { path: 'acerca', component: Acerca },

    { path: 'consultas', component: Consultas ,canMatch:[adminMatchGuard], canActivateChild:[childGuardGuard],
        children:[
            {path:'ver', component:Consultas}
        ]
    },

    {
        path: '', canActivateChild: [childGuardGuard],
        children: [
            { path: 'mascotas', component: Mascotas},
        ]
    },

    { path: 'usuarios', component: Usuarios },

    { path: 'login', component: Login, canMatch:[publicMatchGuard] },
    
    { path: 'cuenta', component: FormularioCuenta, canMatch:[publicMatchGuard]},

    

];

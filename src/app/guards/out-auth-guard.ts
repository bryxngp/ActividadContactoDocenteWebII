import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const outAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  if (authService.sesionIniciada()) {
    return confirm('¿Estás seguro de que quieres salir de la plataforma de Patitas?');
  }

  return true;
};
  
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tratamientos',
  imports: [FormsModule, CommonModule],
  templateUrl: './tratamientos.html',
  styleUrl: './tratamientos.css',
})
export class Tratamientos {

  pacientes = [
    {
      nombre: 'Ramón',
      entrada: new Date('2026-02-01'), 
      gravedad: 'ALTA',
      progresoBase: 10 
    },
    {
      nombre: 'Lucas',
      entrada: new Date('2026-02-03'),
      gravedad: 'BAJA',
      progresoBase: 60
    }
  ];


  obtenerRecuperacion(paciente: any): number {

    const hoy = new Date().getTime();
    const ingreso = paciente.entrada.getTime();
    const diasTranscurridos = Math.floor((hoy - ingreso) / (1000 * 60 * 60 * 24));

    const factorVelocidad = paciente.gravedad === 'ALTA' ? 5 : 15;
    const recuperacionTotal = paciente.progresoBase + (diasTranscurridos * factorVelocidad);

    return recuperacionTotal > 100 ? 100 : recuperacionTotal;
  }
}


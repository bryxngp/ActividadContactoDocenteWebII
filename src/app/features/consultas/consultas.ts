import { Component } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { DetalleMascota } from "../../shared/detalle-mascota/detalle-mascota";
import { Hero } from '../../shared/hero/hero';
import { Servicios } from "../../shared/servicios/servicios";

@Component({
  selector: 'app-consultas',
  imports: [DetalleMascota, Hero, Servicios],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css',
})
export class Consultas {

  mascotas = [
    { id: 1, nombre: "Ramon", especie: "Perro", historial: "Vacunas al dia" },
    { id: 2, nombre: "Lucky", especie: "Gato", historial: "Requiere desparacitacion"},
    { id: 3, nombre: "Valentina", especie: "Conejo", historial: "Requiere rehabilitacion"},
  ]

  mascotaSeleccionada: Mascota | null = null;

  mensajeActivo: String = "";

  verDetalles(mascota: Mascota) {
    this.mascotaSeleccionada = mascota;
  }

  //Recibe un mensaje del componente hijo
  procesarAviso(mensaje: String) {
    this.mensajeActivo = mensaje;
  }
}

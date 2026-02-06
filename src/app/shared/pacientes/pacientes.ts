import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  // Configuración de textos
  @Input() tituloPanel: string = "Panel de pacientes";
  @Input() labelBuscador: string = "Buscador";
  @Input() placeholder: string = "buscar paciente...";

  // Filtro local
  nombreFiltro: string = "";

  // Datos dinámicos
  @Input() listaPacientes: any[] = [];

  // Función para filtrar en el HTML
  get pacientesFiltrados() {
    return this.listaPacientes.filter(p => 
      p.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase())
    );
  }
}
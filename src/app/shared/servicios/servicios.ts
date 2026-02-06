import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  // Ahora estos textos se pueden cambiar desde afuera
  @Input() titulo: string = "Nuestros Servicios";
  @Input() subtitulo: string = "Cuidamos a los que más quieres";
  @Input() textoInteres: string = "Has mostrado interés en";
  @Input() textoBotonActivo: string = "Me interesa";
  @Input() textoBotonInactivo: string =   "No disponible";
  @Input() placeholderBusqueda: string = "Buscar...";

  servicioSeleccionado: string = "Ninguno";
  serviciosFiltrados: any[] = [];
  private _servicios: any[] = [];

  @Input() set servicios(datos: any[]) {
    this._servicios = datos || [];
    this.serviciosFiltrados = [...this._servicios];
  }

  get servicios() {
    return this._servicios;
  }

  seleccionar(nombre: string) {
    this.servicioSeleccionado = nombre;
  }

  busqueda(event: Event) {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    // Actualizamos el subtítulo dinámicamente si hay búsqueda
    this.serviciosFiltrados = this._servicios.filter(s =>
      s.nombre.toLowerCase().includes(valor)
    );
  }
}
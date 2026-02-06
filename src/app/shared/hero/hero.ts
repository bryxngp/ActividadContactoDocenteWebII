import { Component, Input } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  @Input() titulo!: string;
  @Input() subttitulo!: string;
  @Input() descripcion!: string;
  @Input() imagen!:string;
  @Input() colorFondo!:string;

}

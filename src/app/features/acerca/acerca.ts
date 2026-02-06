import { Component } from '@angular/core';
import { HeroAcerca } from '../../shared/hero-acerca/hero-acerca';
import { Tratamientos } from '../../shared/tratamientos/tratamientos';
import { Hero } from '../../shared/hero/hero';
import { Pacientes } from '../../shared/pacientes/pacientes';

@Component({
  selector: 'app-acerca',
  imports: [Hero, Tratamientos, Pacientes],
  templateUrl: './acerca.html',
  styleUrl: './acerca.css',
})
export class Acerca {

}

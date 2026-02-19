import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-cuenta',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-cuenta.html',
  styleUrl: './formulario-cuenta.css',
})
export class FormularioCuenta {

  private fb = inject(FormBuilder);

  reglaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  reglaPassword = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';

  formCuenta = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(this.reglaEmail)]],
      comentar: ['', [Validators.required]]

    },
    //{validators: this.validarClaves}
  );

  //METODO PARA VALIDACION
  /**validarClaves(control: AbstractControl): ValidationErrors | null {
    const clave1 = control.get('password')?.value
    const clave2 = control.get('repeatPassword')?.value;

    return clave1 === clave2 ? null : { noCoinciden: true };
  }*/

  //METODO PARA MOSTRAR LOS ERRORES PERSONALIZAOS
  mostrarError(campo: string, tipoError: string): boolean {
    const input = this.formCuenta.get(campo);

    if (input && input.invalid && input.touched) {
      return input.hasError(tipoError);
    }
    return false;

  };

  registrar() {
    if (this.formCuenta.valid) {

      //URLSearchParams crea un objeto especial q formatea los datos del formulario como una URL
      const contenido = new URLSearchParams();
      contenido.set('form-name', 'contacto');
      contenido.set('email', this.formCuenta.value.email ?? '');
      contenido.set('comentario', this.formCuenta.value.comentar ?? '');

      //Promesa: Funcion especial de JS que se usa para hacer peticiones http atraves de la red
      fetch('/', {
        method: 'POST',
        //INDICAR QUE LOS DATOS Q SE VAN A ENVIAR ESTAN CODIFICADOS COMO UNA URL NO COMO JSON
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },

        //CONVERTIR TODO EL OBJETO A UNA CADENA DE TEXTO LISTA PARA ENVIARSE
        body: contenido.toString()

      })

        //SI LA PROMESA SE CUMPLE 
        .then(() => {
          alert("Enviado con exito ");
          this.formCuenta.reset();
        })

        //SI LA PROMESA NO SE CUMPLE
        .catch((error) => {
          alert("No se pueden enviar los datos: " + error);
        });
    }
  }
}

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
      password: ['', [Validators.required, Validators.pattern(this.reglaPassword)]],
      repeatPassword: ['', [Validators.required]]

    },
    {validators: this.validarClaves}
  );

  //METODO PARA VALIDACION
  validarClaves(control: AbstractControl): ValidationErrors | null {
    const clave1 = control.get('password')?.value
    const clave2 = control.get('repeatPassword')?.value;

    return clave1 === clave2 ? null : { noCoinciden: true };
  }

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
      console.log('La cuenta creada es' ,this.formCuenta.value);

      alert('Registro exitoso');

    }
  }
}

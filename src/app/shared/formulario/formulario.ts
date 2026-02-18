import { Component, inject, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {

  private servicioUsuario = inject(UsuarioService);

  public servicioAuth = inject(AuthService);

  listaUsuarios = signal<Usuario[]>([]);

  editando = false;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rol:'EMPLEADO'

  };

  //Metodo para cargar la info de los usuarios
  ngOnInit() {
    this.obtenerUsuarios();

  }

  //Metodo obtenerusuarios
  obtenerUsuarios() {
    this.servicioUsuario.getUsuarios().subscribe(usuarios => {
      this.listaUsuarios.set(usuarios);
    });
  }


  //METODO GUARDAR
  guardarUsuario() {
    if (this.editando && this.nuevoUsuario.id) {
      this.servicioUsuario.putUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe(() => {
        this.obtenerUsuarios();
        this.resetear();
      });
    }
      else {
        this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe(()=>{
          this.obtenerUsuarios();
          this.resetear();
        });
        }
    }
    
    //METODO ELIMINAR
    eliminarUsuario(id: string){
      if (confirm('Desea eliminar el registro?')) {

        this.servicioUsuario.deleteUsuario(id).subscribe(() => {
          this.obtenerUsuarios();
          

        });
      }
    }

    //METODO PARA PONER LOS DATOS SELECCIONADOS EN EL FORMULARIO
    seleccionarParaEditar(user: Usuario){
      this.editando = true;

      this.nuevoUsuario = { ...user };
    }

    //metodo limpiar formulario
    resetear(){
      this.editando=false;
      this.nuevoUsuario={name:'', email:'', phone:'', password:'', rol:'EMPLEADO'}
    }

    //METODO PARA GUARDAR
    /*guardarUsuario(){
  this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe(usuarioId =>{
    this.listaUsuarios.set([usuarioId, ... this.listaUsuarios()])

    //LIMPAR FORM
    this.nuevoUsuario={name:'',email:'', phone:''};

  });
  }*/
  }

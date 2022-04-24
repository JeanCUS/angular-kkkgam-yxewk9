import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,NgForm } from '@angular/forms';
import { userInterface } from 'src/app/userInterface.model';
import { loginInterface } from 'src/app/loginInterface.model';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css'],
})
export class MiperfilComponent implements OnInit {
  usuarios: userInterface[] = [];
  carga:FormGroup; // nombre del formgroup usado en el html para cargar el perfil

  usuario: userInterface = {
    idj:'',
    nombre: '',
    apellidos: '',
    correo: '',
    contra: '',
  };

  constructor(
    private _usuarioService: LoginService,
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.carga = this.fb.group({
      nombre:[''],
      apellidos:[''],
      correo:['']
    })

  }

  ngOnInit(): void {
    this.getUsuarios();
    
  }

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userInterface[]) => {
      this.usuarios = res;
      this.validLoging();
    });
  }

  

  validLoging() {
    if (this.auth.currentUser !== null) {
      
      for (let i = 0; i < this.usuarios.length; i++) {
        console.log(this.auth.currentUser.email," holii ",this.usuarios[i].correo)
        if(this.usuarios[i].correo==this.auth.currentUser.email){
          this.carga.setValue({
            nombre: this.usuarios[i].nombre,
            apellidos: this.usuarios[i].apellidos,
            correo: this.usuarios[i].correo
          })
        }
      }
    } else {
      console.log('');
    }
  }

  eliminarUsuario() {
    if (this.auth.currentUser !== null) {
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].correo==this.auth.currentUser.email){
          this._usuarioService.eliminarUsuario(this.usuarios[i].idj).then(() => {
            this.auth.currentUser?.delete();
            this.toastr.error('El empleado fue eliminado con éxito', 'Registro eliminado!',{
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log('error')
          });
        }
      }
    }
  }
}

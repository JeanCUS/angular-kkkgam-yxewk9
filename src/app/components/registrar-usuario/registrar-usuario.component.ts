import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInterface } from 'src/app/userInterface.model';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registerUser: FormGroup;
  passLock = true;
  submitted = false;
  loading= false;
  validGugul = false;

  usuario: userInterface = { idj:'',nombre:'', apellidos: '', correo: '', contra: ''};
  constructor(private fb: FormBuilder,private _usuarioService: LoginService, private auth: Auth,private router: Router, private toastr: ToastrService) {
    this.registerUser = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  
  agregarUsuario() {
    const usuario: userInterface = {
      idj:'',
      nombre: this.registerUser.value.nombre,
      apellidos: this.registerUser.value.apellidos,
      correo: this.registerUser.value.correo.toLowerCase(),
      contra: this.registerUser.value.contra
    }
    this.loading = true;
    if (usuario.contra.length >= 6) {
      this._usuarioService.emailSignUp(usuario.correo, usuario.contra).then(() => {
        this._usuarioService.agregarUsuario(usuario).then(() => {
          this.loading = false;
          this.toastr.success('El empleado fue registrado con éxito.', 'Empleado Registrado', { positionClass: 'toast-bottom-right' });
          this.router.navigate(['/Login']);

        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        if (err.message == 'Firebase: Error (auth/invalid-email).') {
          this.loading = false;
          this.toastr.error('El correo ingresado no es válido', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
          this.loading = false;
          this.toastr.error('El correo ingresado ya existe', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        } else if(err.message == 'Firebase: Error (auth/missing-email).'){
          this.loading = false;
          this.toastr.error('Por favor ingrese su correo', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        } 
        console.log(err.message, "este es el mensaje");

      })
    } else {
      this.toastr.error('La contraseña ingresada debe ser mayor a 6 carácteres', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
    }
  }

  buttonVPass() {
    if (this.passLock == true) {
      this.passLock = false;
      console.log(this.passLock)
    } else {
      this.passLock = true;
    }
  }
}

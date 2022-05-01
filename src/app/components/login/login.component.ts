import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, user ,GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { loginInterface } from 'src/app/loginInterface.model';
import { ToastrService } from 'ngx-toastr';
import { userInterface } from 'src/app/userInterface.model';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: userInterface[] = [];
  passLock=true;
  loginForm:FormGroup;

  usuario: loginInterface = { correo: '', contra: '' };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Auth,
    private _serviceAuth: AuthService,
    private _usuarioService: LoginService,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  

  buttonVPass() {
    if (this.passLock === true) {
      this.passLock = false;
      console.log(this.passLock)
    } else {
      this.passLock = true;
    }
  }

  loginWithEmail(){
    const usuario: loginInterface = {
      correo: this.loginForm.value.email,
      contra: this.loginForm.value.password
    }
    this._serviceAuth.emailLogin(usuario.correo, usuario.contra).then(() => {
      this.router.navigate(['/home']);
    })
  }

  loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth,provider).then((re)=>{
    
    for (let i = 0; i < this.usuarios.length; i++) {
      console.log(re.user.email," será? ",this.usuarios[i].correo)
      if(this.usuarios[i].correo==re.user.email){
        console.log("Ya existe ")
        return
      }
    }
    // const token = provider;
    // console.log(token)
    // const user = re.user;
    // console.log(user)
    this.router.navigate(['/Home'])
    
    })
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
        if(this.usuarios[i].correo==this.auth.currentUser.email){
          // console.log("Ya existe ")
          return
        }
        if((i+1)==this.usuarios.length){

        }
      }
    } else {
      console.log('No está logeado');
    }
  }

}

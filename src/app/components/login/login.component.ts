import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { loginInterface } from 'src/app/loginInterface.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passLock=true;
  loginForm:FormGroup;

  usuario: loginInterface = { correo: '', contra: '' };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
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
    this._serviceAuth.signInWithGoogle().then();
    
  }
}

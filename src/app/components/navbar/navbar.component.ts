import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { userInterface } from 'src/app/userInterface.model';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarios: userInterface[] = [];
  usuario: userInterface = {
    idj:'',
    nombre: '',
    apellidos: '',
    correo: '',
    contra: '',
  };

  constructor(private auth: Auth, private _usuarioService: LoginService) { }
  
  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userInterface[]) => {
      this.usuarios = res;
      // this.validarEmail();
      // this.validLoging();
      
    });
  }
  validLoging() {
    if (this.auth.currentUser!== null) {
      return true
    } else {
      return false
    }
  }

  SignOut() {
    this.auth.signOut();
  }
  
}

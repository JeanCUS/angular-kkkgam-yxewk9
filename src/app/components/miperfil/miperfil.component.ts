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
  empleados: userInterface[] = [];
  pregunta=false;

  
  carga:FormGroup;

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
    this.getEmpleados();
    
  }

  getEmpleados() {
    this._usuarioService.getEmpleados().subscribe((res: userInterface[]) => {
      this.empleados = res;
      this.validLoging();
    });
  }

  // eliminarEmpleado() {
    
  //   this._usuarioService.eliminarEmpleado(id).then(() => {
  //     this.toastr.error('El empleado fue eliminado con éxito', 'Registro eliminado!',{
  //       positionClass: 'toast-bottom-right'
  //     });
  //   }).catch(error => {
  //     console.log('error')
  //   });
  // }

  validLoging() {
    if (this.auth.currentUser !== null) {
      for (let i = 0; i < this.empleados.length; i++) {
        console.log(this.auth.currentUser.email," holii ",this.empleados[i].correo)
        if(this.empleados[i].correo==this.auth.currentUser.email){
          console.log("Enta")
          this.carga.setValue({
            nombre: this.empleados[i].nombre,
            apellidos: this.empleados[i].apellidos,
            correo: this.empleados[i].correo
          })
        }
      }
    } else {
      console.log('');
    }
  }
}

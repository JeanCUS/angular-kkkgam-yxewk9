import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/productInterface.model';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  registerProducto: FormGroup;
  passLock = true;
  submitted = false;
  loading= false;
  validGugul = false;

  constructor(private fb: FormBuilder,private _usuarioService: LoginService, private auth: Auth,private router: Router, private toastr: ToastrService) {
    this.registerProducto = this.fb.group({
    nombre: ['', Validators.required],
    precio: ['', Validators.required]
  }) 
  }

  ngOnInit(): void {
  }

  
  agregarProducto() {
    const usuario: Product = {
    nombre: this.registerProducto.value.nombre,
    precio: this.registerProducto.value.precio
  }
  this.loading = true;
      this._usuarioService.agregarProducto(usuario).then(() => {
        this.loading = false;
        // this.toastr.success('El empleado fue registrado con éxito.', 'Empleado Registrado', { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/Mi-Perfil']);

      }).catch(err => {
        console.log(err);
      })
  }
}

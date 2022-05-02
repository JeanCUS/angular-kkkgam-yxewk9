import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, user ,GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { userInterface } from 'src/app/userInterface.model';
import { LoginService } from 'src/app/services/login.service';
// import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/productInterface.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios: userInterface[] = [];
  productos: Product[]=[]; 
  constructor(private auth:Auth, private _usuarioService: LoginService) { }
  

  ngOnInit(): void {
    this.getUsuarios();
    this.getProductos();
  }

  getProductos() {
    this._usuarioService.getProductos().subscribe((res: Product[]) => {
      this.productos = res;
      // this.validLoging();
      this.cargarProductos();
    });
  }

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userInterface[]) => {
      this.usuarios = res;
      this.validLoging();
      this.cargarProductos();
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

  cargarProductos(){
    var contador = 0;
    var contarFila = 0
    for (var i = 0; i < this.productos.length; i++){
      if(contador==5){
        contarFila=contarFila+1
        this.crearFila(String(contarFila))
        contador=0;
      }
      this.crearDiv(String(contarFila),this.productos[i].nombre, String(this.productos[i].precio));
      contador=contador+1;
    }
  }


  crearFila(idecito:string){
    const fondo= document.getElementById("fondo");
    const cajitaFila = document.createElement("div");
    cajitaFila.className = "card-group"
    cajitaFila.id="cardGroup"+idecito
    fondo?.appendChild(cajitaFila)
  }

  crearDiv(contarFila:string,nombrecito:string, preciecito:string) {
    var filita="cardGroup"+contarFila
    const cajitaFila = document.getElementById(filita);
    // 2. Create a new <p></p> element programmatically
    const cajitaColumna = document.createElement("div");
    // 3. Add the text content
    //Estilos
    cajitaColumna.className = "card"
    cajitaColumna.style.maxWidth= "23%";
    cajitaColumna.style.marginLeft= "1%";
    cajitaColumna.style.marginRight= "1%";
    cajitaColumna.style.maxHeight= "23%";
    cajitaColumna.style.marginTop="1%";
    cajitaColumna.style.marginBottom="1%";
    cajitaColumna.id = "divcito"
    
    // 4. Append the p element to the div element
    cajitaFila?.appendChild(cajitaColumna);

    
    const imagenProducto = document.createElement("img");
    imagenProducto.className="card-img-top"
    imagenProducto.style.maxWidth = "33.3%";
    imagenProducto.style.maxHeight = "48%";
    imagenProducto.style.marginLeft= "33.3%";
    imagenProducto.style.marginRight= "33.3%";
    imagenProducto.style.marginTop= "2%";
    imagenProducto.src=""
    cajitaColumna?.appendChild(imagenProducto)

    const cajitaAdentroDeColumna = document.createElement("div");
    cajitaAdentroDeColumna.className="card-body";
    cajitaAdentroDeColumna.style.textAlign= "center";
    cajitaAdentroDeColumna.id = "divcitoAdentro"
    cajitaColumna?.appendChild(cajitaAdentroDeColumna);

    const nombre = document.createElement("h5");
    nombre.className = "card-title"
    nombre.textContent = nombrecito
    cajitaAdentroDeColumna.appendChild(nombre);

    const precio = document.createElement("p")
    precio.className = "card-text"
    precio.textContent = "₡"+preciecito
    cajitaAdentroDeColumna.appendChild(precio);
  
  }

}

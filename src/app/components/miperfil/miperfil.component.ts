import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,NgForm } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { userInterface } from 'src/app/userInterface.model';
import { loginInterface } from 'src/app/loginInterface.model';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css'],
})
export class MiperfilComponent implements OnInit {
  // esteLabel:Label;
  id: string | null;
  usuarios: userInterface[] = [];
  carga:FormGroup; // nombre del formgroup usado en el html para cargar el perfil
  verificarCorreo=true;
  editando=false;
  passLock = true;
  usuario: userInterface = {
    idj:'',
    nombre: '',
    apellidos: '',
    correo: '',
    contra: '',
  };

  constructor(
    private firestore: Firestore,
    private _usuarioService: LoginService,
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute
  ) {
    this.carga = this.fb.group({
      nombre:[''],
      apellidos:[''],
      correo:[''],
      contra:['']
    })
    this.id = this.aRoute.snapshot.paramMap.get('id'); //esto es para atrapar el id marcado en la ruta del editar
  }

  ngOnInit(): void {
    this.getUsuarios();
    
  }  

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userInterface[]) => {
      this.usuarios = res;
      // this.validarEmail();
      this.validLoging();
      
    });
  }
  validarEmail(){
    if(this.auth.currentUser!==null){
      if(this.auth.currentUser.emailVerified===true){
        console.log(this.auth.currentUser.emailVerified)
        return true
      }
    }
    return false
  }
  

  validLoging() {
    if (this.auth.currentUser !== null) {
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].correo==this.auth.currentUser.email){
          this.carga.setValue({
            nombre: this.usuarios[i].nombre,
            apellidos: this.usuarios[i].apellidos,
            correo: this.usuarios[i].correo,
            contra: ''
          })
        }else if(this.validarEmail()==true){
          this.carga.setValue({
            nombre: this.auth.currentUser.displayName,
            apellidos: '',
            correo: this.auth.currentUser.email
          })
        }
      }
    } else {
      console.log('No está logeado');
    }
  }

  cambiarEditorTrue(){
    var nombre = document.getElementById("nombre");
    
    var apellidos = document.getElementById("apellidos");
    this.editando=true;
    if (nombre != null){
      nombre.style.borderColor="black";
      
      nombre.onmousedown = function onmousedown(event) {
          return true
        }
        if (apellidos != null){
          apellidos.style.borderColor="black";
            apellidos.onmousedown = function onmousedown(event){
            return true
          }
        }
    }
    
  }
  cambiarEditorFalse(){
    var result = document.getElementById("nombre");
     console.log(result?.onmousedown)
    if (result != null){
        result.onmousedown = function onmousedown(event) {
          return false
        }
    }
    
  }

  

  async editarEmpleado() {
    const usuario: any = {
      nombre: this.carga.value.nombre,
      apellidos: this.carga.value.apellidos,
      correo: this.carga.value.correo,
      contra : this.carga.value.contra
    }
    
    const q = query(collection(this.firestore, "usuariosI"), where("correo", "==", this.auth.currentUser?.email));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (this.auth.currentUser !== null) {
        for (let i = 0; i < this.usuarios.length; i++) {
          if(this.usuarios[i].correo==this.auth.currentUser.email){        
            let esto = this._usuarioService.getIdDoc(this.auth.currentUser.email);  
            this._usuarioService.updateUsuario(doc.id, usuario).then(() => {
              this.editando = false;
              this.toastr.info('Empleado modificado con exito', 'Empleado modificado');
              this.router.navigate(['/Home']);
              this.cambiarEditorFalse();
            })
          }
        }
      }
    });

    
  }

  eliminarUsuario() {
    if (this.auth.currentUser !== null) {
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].correo==this.auth.currentUser.email){
          this._usuarioService.eliminarUsuario(this.usuarios[i].correo).then(() => {
            // this.auth.currentUser?.delete();
            this.toastr.error('El empleado fue eliminado con éxito', 'Registro eliminado!',{
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log('error')
          });
        }
      }this.auth.currentUser?.delete();
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

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { userInterface } from '../userInterface.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: Firestore, private auth: Auth) {
  }

 agregarUsuario(usuario: userInterface) {
   const usuariosRef = collection(this.firestore, 'usuariosI');
   return addDoc(usuariosRef, usuario);
 }

 getEmpleados(): Observable<userInterface[]> {
   const empleados = collection(this.firestore, 'usuariosI');
   return collectionData(empleados, { idField: 'idj' }) as Observable<userInterface[]>
 }

 getEmpleado(idj: string):Observable<any[]>{
  const bookRef = doc(this.firestore, 'empleados/'+idj);
  return docData(bookRef, { idField: 'idj' }) as Observable<any>;
}

 async emailSignUp(email: string, password: string)
   : Promise<void> {

   const credential = await createUserWithEmailAndPassword(
     this.auth,
     email,
     password
   );
   await updateProfile(
     credential.user, { displayName: credential.user.displayName }
   );
   // await sendEmailVerification(credential.user);

   // create user in db
   // ...
 }

 eliminarEmpleado(id: string): Promise<any> {
  const empleadoRef = doc(this.firestore, 'empleados/' + id);
  return deleteDoc(empleadoRef);
}

 getEmpresa(correo: string):Observable<any[]>{
   const bookRef = doc(this.firestore, 'usuariosI/'+correo);
   return docData(bookRef, { idField: 'idj' }) as Observable<any>;
 }

}

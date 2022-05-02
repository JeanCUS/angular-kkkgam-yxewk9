import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { userInterface } from '../userInterface.model';
import { Product } from 'src/app/productInterface.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: Firestore, private auth: Auth) {
  }

  agregarProducto(usuario: Product) {
    const usuariosRef = collection(this.firestore, 'productos');
    return addDoc(usuariosRef, usuario);
  }

 agregarUsuario(usuario: userInterface) {
   const usuariosRef = collection(this.firestore, 'usuariosI');
   return addDoc(usuariosRef, usuario);
 }
 getProductos(): Observable<Product[]> {
  const usuarios = collection(this.firestore, 'productos');
  return collectionData(usuarios, { idField: 'id' }) as Observable<Product[]>
}
 getUsuarios(): Observable<userInterface[]> {
   const usuarios = collection(this.firestore, 'usuariosI');
   return collectionData(usuarios, { idField: 'idj' }) as Observable<userInterface[]>
 }

 getEmpleado(id: string):Observable<any[]>{
  const bookRef = doc(this.firestore, 'usuariosI/'+id);
  return docData(bookRef, { idField: 'id' }) as Observable<any>;
}

 async emailSignUp(email: string, password: string)
   : Promise<void> {
  if(email!==null){
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(
      credential.user, { displayName: credential.user.displayName }
    );
  }
   
 }

 eliminarUsuario(correo: string): Promise<any> {
  const usuarioRef = doc(this.firestore, 'usuariosI/' + correo);
  return deleteDoc(usuarioRef);
}

 getEmpresa(correo: string):Observable<any[]>{
   const bookRef = doc(this.firestore, 'usuariosI/'+correo);
   return docData(bookRef, { idField: 'id' }) as Observable<any>;
 }

 updateUsuario(id:string, usuario: any): Promise<any> {
  const userDocRef = doc(this.firestore, 'usuariosI/'+id);
  return updateDoc(userDocRef, usuario);
}

async getIdDoc(correo: string) {
  console.log(correo)
  const q = query(collection(this.firestore, "usuariosI"), where("correo", "==", correo));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // console.log(doc.id)
    return doc.id
  });
}

}

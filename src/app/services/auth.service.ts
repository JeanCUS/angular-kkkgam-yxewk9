import { Injectable , NgZone} from '@angular/core';
import { Auth, signInWithEmailAndPassword, user ,GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router, private toastr: ToastrService) { 
    
  }

  async emailLogin(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  

  async SignOut() {
    await this.auth.signOut();
  }
  
  async signInWithGoogle(){

    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth,provider).then((re)=>{
      console.log(re);
      // toast.success("Inicio de sesión exitoso");
      const token = provider;

    // The signed-in user info.
    const user = re.user;
    console.log(user)
    this.router.navigate(['/Home'])
    })
  }  
  
}

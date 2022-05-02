import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { MiperfilComponent } from './components/miperfil/miperfil.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Navbar', component: NavbarComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registrar-Usuario', component: RegistrarUsuarioComponent },
  { path: 'Mi-Perfil', component: MiperfilComponent },
  {path: 'Mi-Perfil/:idj', component: MiperfilComponent},
  { path: 'Agregar-Producto', component: AgregarProductoComponent },
  { path: '**', redirectTo: 'Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
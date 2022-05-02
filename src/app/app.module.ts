import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';


import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import {provideAuth,getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { MiperfilComponent } from './components/miperfil/miperfil.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot(), 
    provideAuth(() => getAuth()), // ToastrModule added
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrarUsuarioComponent,
    HomeComponent,
    MiperfilComponent,
    AgregarProductoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit(): void {
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

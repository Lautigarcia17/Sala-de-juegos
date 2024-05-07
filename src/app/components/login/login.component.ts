import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalDataService } from '../../services/global-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { User } from '../../classes/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  loading : boolean = false;

  constructor(private fb: FormBuilder, private database : DatabaseService, private authentication : AuthService, private localstorage : LocalStorageService, private globalData : GlobalDataService, private router : Router, private toastr : ToastrService){}


  formUser : FormGroup = this.fb.group({
    'email': ["",[Validators.required,Validators.email]],
    "password": ["",Validators.required]
  })

  login()
  {
    let btnLogin : HTMLElement = document.getElementById('btn-login') as HTMLElement; 
    let user : User = new User(
      this.formUser.get('email')?.value ?? '',
      this.formUser.get('password')?.value ?? ''
    )

    this.loading = true;  
    btnLogin.setAttribute('disabled', 'true');

    this.authentication.login(user.email,user.password)
    .then( () =>{
        this.database.findUsernameDatabase(user.email)
        .then((username : string ) =>{
          this.localstorage.saveDataUser(username);
          this.router.navigate(["home"]); 
          this.globalData.setStateLogin(true);
          this.database.saveLog(username);
          this.toastr.success("Te has logeado !","Felicidades!", {timeOut: 3000,progressBar: true,closeButton:true}); 
        })
        .finally( () =>{
          this.loading = false;
        })
      })
    .catch( () =>{
      this.loading = false;
      btnLogin.removeAttribute('disabled');
      this.toastr.error("El usuario o contraseña son incorrectos","Aviso!", {timeOut: 3000,progressBar: true,closeButton:true}); 
    })
    
  }

  accessAutomatically(numberUser : number)
  {
    switch(numberUser)
    {
      case 1:
        this.formUser.patchValue({
          "email": "lauti1718garcia@gmail.com",
          "password": "lauticrack1"
        })
      break;
      case 2:
        this.formUser.patchValue({
          "email": "emanuelgarcia@gmail.com",
          "password": "ema456"
        })
      break;
    } 
  }



}

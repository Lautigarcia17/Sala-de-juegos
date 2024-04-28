import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalDataService } from '../../services/global-data.service';
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { User } from '../../classes/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent {
  loading : boolean = false;

  constructor(private fb: FormBuilder, private database : DatabaseService, private authentication : AuthService, private toastr : ToastrService,
              private localstorage : LocalStorageService, private globalData : GlobalDataService, private router : Router){}

  formUser : FormGroup = this.fb.group({
    'email': ["",[Validators.required,Validators.email]],
    "password": ["",Validators.required],
    "username": ["",Validators.required]
  })

  register()
  {
    let btnRegister : HTMLElement = document.getElementById('btn-register') as HTMLElement;
    let user : User = new User(
      this.formUser.get('email')?.value ?? '',
      this.formUser.get('password')?.value ?? '',
      this.formUser.get('username')?.value ?? ''
    )

    this.loading = true;
    btnRegister.setAttribute('disabled', 'true');

    this.database.isUsernameAvailable(user.username)
    .then( (response : boolean) => {
      if (response) {
        this.authentication.register(user.email,user.password)
        .then( () => {
          this.database.saveUserDatabase(user);
          this.localstorage.saveDataUser(user.username);
          this.globalData.setStateLogin(true);
          this.toastr.success("Te has registrado !","Felicidades!", {timeOut: 3000,progressBar: true,closeButton:true}); 
          this.router.navigate(["home"]);
        }).catch( () =>{
          this.toastr.info("El email ya esta registrado, utiliza otro!","Aviso!", {timeOut: 3000,progressBar: true,closeButton:true}); 
        } )
        .finally( () =>{
          this.loading = false;
          btnRegister.removeAttribute('disabled');
        })
      }else{
        this.toastr.info("El nombre de usuario ya esta registrado, utiliza otro!","Aviso!", {timeOut: 3000,progressBar: true,closeButton:true}); 
        this.loading = false;
        btnRegister.removeAttribute('disabled');
      }

    })
    .catch( (error : any) =>{
      this.loading = false;
      btnRegister.removeAttribute('disabled');
      console.log(error);
    })
    

  }


}






import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageAlertService } from '../../services/message-alert.service';
import { SweetAlertIcon } from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private messageAlert : MessageAlertService){}


  formUser : any= this.fb.group({
    'email': ["",[Validators.required,Validators.email]],
    "password": ["",Validators.required]
  })

  login()
  {
    let email: string = this.formUser.get('email')?.value ?? ''; // With "??", If null,it becomes an empty string 
    let password: string = this.formUser.get('password')?.value ?? '';
    console.log(email);
    console.log(password);
    let message :string  = "Login correctly";
    let icon :SweetAlertIcon  = "success";
    let title :string = "Congratulations";

    this.messageAlert.showAlert(message,icon,title);
  }

  accessAutomatically(numberUser : number)
  {
    switch(numberUser)
    {
      case 1:
        this.formUser.patchValue({
          "email": "lauti1718garcia@gmail.com",
          "password": "lautaro123"
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

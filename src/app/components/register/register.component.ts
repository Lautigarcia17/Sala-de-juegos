import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageAlertService } from '../../services/message-alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private messageAlert : MessageAlertService){}


  formUser : any= this.fb.group({
    'email': ["",[Validators.required,Validators.email]],
    "password": ["",Validators.required],
    "username": ["",Validators.required]
  })

}

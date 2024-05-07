import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { GlobalDataService } from './services/global-data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { LocalStorageService } from './services/local-storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public globalData : GlobalDataService, private authentication : AuthService, private router : Router, public localstorage : LocalStorageService, private toastr : ToastrService){}


  logOut()
  {
    Swal.fire({
      title: "Estas seguro?",
      text: "Volveras al inicio y deberas loguear",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then( (result : SweetAlertResult) =>{
      if (result.isConfirmed) {
        this.authentication.logout()
        .then( () =>{
          this.globalData.setLogout()
          this.router.navigate(["login"]); 
          this.toastr.success("Te has deslogueado","Nos vemos!", {timeOut: 3000,progressBar: true,closeButton:true});

        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No te has deslogueado !', 'success');
      }

    })
  }

}

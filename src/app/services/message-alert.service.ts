import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageAlertService {

  constructor() { }

  showAlert(message : string,iconName: SweetAlertIcon,titleStr : string = "Congratulations")
  {
      Swal.fire({
          title: titleStr,
          text:  message ,
          icon: iconName,
          confirmButtonText: 'OK'
        });
  }
  showAlertWithResponse(title : string, text: string) : Promise<SweetAlertResult>
  {
      return Swal.fire({
          title,
          text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        })   
  }

}

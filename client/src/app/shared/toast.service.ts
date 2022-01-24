import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor() {}

  fireToast(icon, title1: string) {
    this.Toast.fire({
      icon: icon,
      title: title1,
      showClass: {
        backdrop: 'swal2-noanimation',
        icon: ''                       
      },
    });
  }
}

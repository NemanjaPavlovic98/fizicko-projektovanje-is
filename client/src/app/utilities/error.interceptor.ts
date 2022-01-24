import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { ToastService } from '../shared/toast.service';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
  
          let errorMessage = 'An unknown message occured!';
  
          if (error.error.message) {
            errorMessage = error.error.message;
          }
  
          this.toastService.fireToast('error', errorMessage);
          return throwError(error);
        })
      );
    }
  }
  
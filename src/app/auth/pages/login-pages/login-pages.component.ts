import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent {

  private fb = inject( FormBuilder )
  private authService =  inject( AuthService )
  private router = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email: ['rolando1@gmail.com', [ Validators.required, Validators.email] ],
    password: ['1234567', [ Validators.required, Validators.minLength(6)] ],
  })

  public login():void{
    const { email, password } = this.myForm.value
    this.authService.login( email, password )
    .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err)=>{
        Swal.fire('Error', err, 'error')
      }
    } )
  }
}

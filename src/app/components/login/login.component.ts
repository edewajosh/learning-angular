import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsermanagerService } from 'src/app/service/usermanager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userManager: UsermanagerService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f (){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return
    }

    console.log('Submitted value', this.loginForm.value);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userManager.authenticate(username, password).subscribe(
      result => {
        localStorage.setItem('token', result['token']),
        localStorage.setItem('refresh', result['token']),
        this.router.navigate(['/dashboard'])
        console.log(result);
      },
      error => {
        console.log(error)
      }
    );
  }

}

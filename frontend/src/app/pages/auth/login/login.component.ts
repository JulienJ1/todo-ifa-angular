import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form = new FormGroup({});
  subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData(): void {
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
      this.subscription.add(
        this.authService.login(this.form.getRawValue())
          .subscribe(
            user => {
              this.authService.setCredentials(user);
              this.router.navigate(['/']).then();
            },
            error => { console.log(error) }
          )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

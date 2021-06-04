import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form = new FormGroup({});
  subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData(): void {

  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.subscription.add(
        this.authService.register(this.form.getRawValue())
          .subscribe(
            user => {
              this.authService.setCredentials(user);
              this.router.navigate(['/']).then();
            },
            error => {
              console.log(error)
            }
          )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

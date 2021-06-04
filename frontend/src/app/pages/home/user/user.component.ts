import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form = new FormGroup({});
  subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser);
    this.initForm();
  }

  initForm(): void {
    console.log(this.authService.currentUser)
    // @ts-ignore
    this.form = new FormGroup({
      _id: new FormControl(this.authService.currentUser._doc._id),
      email: new FormControl(this.authService.currentUser.email, [Validators.email]),
      name: new FormControl(this.authService.currentUser.name)
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.subscription.add(
        this.authService.updateProfil(this.form.getRawValue()).subscribe((user) => {
          this.authService.updateCredentials(this.form.getRawValue());
          this.initForm();
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

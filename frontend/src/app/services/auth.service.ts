import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserModel>({ email: '', name: '', password: '', token: ''});
    this.user = this.userSubject.asObservable();
  }

  public get currentUser(): UserModel {
    return this.userSubject.value;
  }

  public get isLogged(): boolean {
    return !!this.currentUser.token;
  }

  async initUser() {
    try {
      const user = await this.http.get<UserModel>(`${environment.apiUrl}/auth/relogin`).toPromise();
      if (user) {
        this.setCredentials(user);
      } else {
        this.logout();
      }
    } catch (e) {
      this.logout();
    }
  }

  login(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/auth/login`, user);
  }

  register(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/auth/register`, user);
  }

  setCredentials(user: UserModel) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user._doc));

    const newUser :UserModel = { email: user._doc.email, name: user._doc.name, _id: user._doc._id, _doc: user._doc, token: user.token, password: user.password }

    this.userSubject.next(newUser);
  }

  updateCredentials(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('ici')
    console.log(user)
    user._doc = user;
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next({_doc: undefined, email: '', name: '', password: '', token: ''});
  }

  updateProfil(user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${environment.apiUrl}/users/${user._id}`, user);
  }
}

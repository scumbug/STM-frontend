import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth.model';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private role;
  private id;

  constructor(private http: HttpClient, private router: Router) {}

  async login(credentials: Auth): Promise<boolean> {
    try {
      const res = await this.http
        .post<any>('/backend/authenticate', credentials, {
          observe: 'response',
        })
        .toPromise();
      if (res.status == 200) {
        console.log(res);
        localStorage.setItem('id', res.body.id);
        localStorage.setItem('token', res.body.token);
        localStorage.setItem('role', res.body.roles);
        localStorage.setItem(
          'expiration',
          jwt_decode<JwtPayload>(res.body.token).exp.toString()
        );
        // this.token = res.body.token;
        // this.role = res.body.roles;
        // this.id = res.body.id;
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration');
    this.router.navigate(['/login']);
  }

  sendToken() {
    //return 'Bearer ' + this.token;
    return 'Bearer ' + localStorage.getItem('token');
  }

  getRole() {
    //return this.role[0];
    return localStorage.getItem('role');
  }

  isLogin() {
    //return this.token != '';
    const expiration = new Date(parseInt(localStorage.getItem('expiration')));
    return isBefore(expiration, new Date());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLoginPermission(route, url);
  }

  checkLoginPermission(route: ActivatedRouteSnapshot, url: any) {
    if (this.isLogin()) {
      const role = this.getRole();
      if (route.data.role && route.data.role.indexOf(role) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    return false;
  }
}

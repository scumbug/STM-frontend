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
        this.token = res.body.token;
        this.role = res.body.roles;
        this.id = res.body.id;
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  sendToken() {
    return 'Bearer ' + this.token;
  }

  getRole() {
    return this.role[0];
  }

  isLogin() {
    return this.token != '';
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
    this.router.navigate(['/login']);
    return false;
  }
}

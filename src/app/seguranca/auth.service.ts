import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loadToken();
  }

  url = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return await lastValueFrom(this.http.post(this.url, body, { headers }))
      .then((res: any) => {
        this.storeToken(res.access_token);
      })
      .catch((res): any => {
        if (res.status === 400) {
          if (res.error.error == 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(res);
      });
  }

  hasAuthority(authority: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(authority);
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/categorias';

  async listarTodas() {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return await lastValueFrom(this.http.get(`${this.url}`)).then(
      (res: any) => res
    );
  }
}

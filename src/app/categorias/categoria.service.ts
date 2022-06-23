import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  categoriasUrl = 'http://localhost:8080/categorias';

  async listarTodas() {
    return await lastValueFrom(this.http.get(this.categoriasUrl)).then((res: any) => res);
  }
}

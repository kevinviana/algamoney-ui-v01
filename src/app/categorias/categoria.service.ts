import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoriasUrl: string = '';

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  async listarTodas() {
    return await lastValueFrom(this.http.get(this.categoriasUrl)).then(
      (res: any) => res
    );
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/pessoas';

  async pesquisar(filtro: PessoaFiltro) {
    let params = new HttpParams();
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return await lastValueFrom(
      this.http.get(this.url, { params, headers })
    ).then((res: any) => {
      const pessoas = res['content'];
      const result = {
        pessoas,
        total: res.totalElements,
      };

      return result;
    });
  }

  async excluir(codigo: number) {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return await lastValueFrom(
      this.http.delete(`${this.url}/${codigo}`, { headers })
    );
  }

  async status(codigo: number, status: boolean) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return await lastValueFrom(
      this.http.put(`${this.url}/${codigo}/ativo`, status, {
        headers,
      })
    );
  }

  async listarTodas() {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return await lastValueFrom(this.http.get(this.url, { headers })).then(
      (res: any) =>
        res['content'].map((p: any) => ({
          codigo: p.codigo,
          nome: p.nome,
        }))
    );
  }

  async add(pessoa: Pessoa) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return await lastValueFrom(
      this.http.post(this.url, pessoa, { headers })
    ).then((res: any) => res);
  }

  async buscarPorCodigo(codigo: number) {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return await lastValueFrom(
      this.http.get(`${this.url}/${codigo}`, { headers })
    ).then((res: any) => res);
  }

  async atualizar(pessoa: Pessoa) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return await lastValueFrom(
      this.http.put(`${this.url}/${pessoa.codigo}`, pessoa, { headers })
    ).then((res: any) => res);
  }
}

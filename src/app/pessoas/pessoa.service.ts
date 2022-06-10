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

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return await lastValueFrom(this.http.get(this.url, { params })).then(
      (res: any) => {
        const pessoas = res['content'];
        const result = {
          pessoas,
          total: res.totalElements,
        };

        return result;
      }
    );
  }

  async excluir(codigo: number) {
    return await lastValueFrom(this.http.delete(`${this.url}/${codigo}`));
  }

  async status(codigo: number, status: boolean) {
    return await lastValueFrom(
      this.http.put(`${this.url}/${codigo}/ativo`, status)
    );
  }

  async listarTodas() {
    return await lastValueFrom(this.http.get(this.url)).then((res: any) =>
      res['content'].map((p: any) => ({
        codigo: p.codigo,
        nome: p.nome,
      }))
    );
  }

  async add(pessoa: Pessoa) {
    return await lastValueFrom(this.http.post(this.url, pessoa)).then(
      (res: any) => res
    );
  }

  async buscarPorCodigo(codigo: number) {
    return await lastValueFrom(this.http.get(`${this.url}/${codigo}`)).then(
      (res: any) => res
    );
  }

  async atualizar(pessoa: Pessoa) {
    return await lastValueFrom(
      this.http.put(`${this.url}/${pessoa.codigo}`, pessoa)
    ).then((res: any) => res);
  }
}

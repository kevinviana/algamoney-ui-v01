import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  url = 'http://localhost:8080/lancamentos';

  async pesquisar(filtro: LancamentoFiltro) {
    let params = new HttpParams();
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set(
        'dataVencimentoDe',
        this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!
      );
    }

    if (filtro.dataVencimentoFim) {
      params = params.set(
        'dataVencimentoAte',
        this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!
      );
    }

    return await lastValueFrom(
      this.http.get(`${this.url}?resumo`, { headers, params })
    ).then((res: any) => {
      const lancamentos = res['content'];
      const result = {
        lancamentos,
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

  async add(lancamento: Lancamento) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return await lastValueFrom(
      this.http.post(this.url, lancamento, { headers })
    ).then((res: any) => {
      this.converterStringsParaDatas([res]);
      return res;
    });
  }

  async atualizar(lancamento: Lancamento) {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return await lastValueFrom(
      this.http.put(`${this.url}/${lancamento.codigo}`, lancamento, { headers })
    ).then((res: any) => {
      this.converterStringsParaDatas([res]);
      return res;
    });
  }

  async buscarPorCodigo(codigo: number) {
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return await lastValueFrom(
      this.http.get(`${this.url}/${codigo}`, { headers })
    ).then((res: any) => {
      this.converterStringsParaDatas([res]);
      return res;
    });
  }

  private converterStringsParaDatas(lancamentos: any[]) {
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(
        new Date(lancamento.dataVencimento).getTime() + offset
      );

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(
          new Date(lancamento.dataPagamento).getTime() + offset
        );
      }
    }
  }
}

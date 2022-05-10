import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  constructor(private pessoaService: PessoaService) {}

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  aoMudarPagina(event: LazyLoadEvent): void {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina= pagina;
    this.pessoaService.pesquisar(this.filtro).then((res) => {
      this.pessoas = res.pessoas;
      this.totalRegistros = res.total;
    });
  }
  ngOnInit(): void {}
}

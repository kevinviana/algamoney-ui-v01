import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {
  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid!: Table;

  aoMudarPagina(event: LazyLoadEvent): void {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then((res) => {
      this.pessoas = res.pessoas;
      this.totalRegistros = res.total;
    });
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza  que deseja excluir esta Pessoa?',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  excluir(pessoa: any) {
    this.pessoaService
      .excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa excluída com sucesso',
        });
      })
      .catch((err) => this.errorHandler.handle(err));
  }

  ngOnInit(): void {}
}

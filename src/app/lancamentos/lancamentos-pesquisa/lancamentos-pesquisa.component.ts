import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
  ) {}

  lancamentos: Object[] = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid!: Table;

  temPermissao(authority: string) {
    return this.auth.hasAuthority(authority);
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this.lancamentoService
      .pesquisar(this.filtro)
      .then((res) => {
        this.totalRegistros = res.total;
        this.lancamentos = res.lancamentos;
      })
      .catch((err) => this.errorHandler.handle(err));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza  que deseja excluir o Lançamento?',
      accept: () => {
        this.excluir(lancamento);
      },
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService
      .excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({
          severity: 'success',
          detail: 'Lancamento excluído com sucesso',
        });
      })
      .catch((err) => this.errorHandler.handle(err));
  }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Lançamentos');
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})
export class LancamentoCadastroComponent implements OnInit {
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  carregarCategorias() {
    return this.categoriaService
      .listarTodas()
      .then((categorias) => {
        this.categorias = categorias.map((c: any) => ({
          label: c.nome,
          value: c.codigo,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService
      .listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.map((p: any) => ({
          label: p.nome,
          value: p.codigo,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  salvar(lancamentoForm: NgForm): void {
    if (this.editando) {
      this.atualizarLancamento(lancamentoForm);
    } else {
      this.adicionarLancamento(lancamentoForm);
    }
  }

  adicionarLancamento(lancamentoForm: NgForm): void {
    this.lancamentoService
      .add(this.lancamento)
      .then((lancamento) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lancamento cadastrado com sucesso',
        });
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarLancamento(lancamentoForm: NgForm): void {
    this.lancamentoService
      .atualizar(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
        this.messageService.add({
          severity: 'success',
          detail: 'Lancamento alterado com sucesso',
        });
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService
      .buscarPorCodigo(codigo)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset();

    setTimeout(() => (this.lancamento = new Lancamento()), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }
}

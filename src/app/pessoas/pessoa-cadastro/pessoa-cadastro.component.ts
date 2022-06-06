import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {
  constructor(
    private pessoaService: PessoaService,
    private mesageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  pessoa = new Pessoa();

  salvar(pessoaForm: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(pessoaForm);
    } else {
      this.adicionarPessoa(pessoaForm);
    }
  }

  atualizarPessoa(pessoaForm: NgForm): void {
    this.pessoaService
      .atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
        this.mesageService.add({
          severity: 'success',
          detail: 'Pessoa alterada com sucesso',
        });
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  adicionarPessoa(pessoaForm: NgForm): void {
    this.pessoaService
      .add(this.pessoa)
      .then((pessoa) => {
        this.mesageService.add({
          severity: 'success',
          detail: 'Pessoa cadastrada com sucesso',
        });
        this.router.navigate(['/pessoa', pessoa.codigo])
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then((pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    });
  }

  get editando(): boolean {
    return Boolean(this.pessoa.codigo);
  }

  atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(pessoaForm: NgForm) {
    pessoaForm.reset();

    setTimeout(() => (this.pessoa = new Pessoa()), 1);

    this.router.navigate(['/pessoa/novo']);
  }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');

    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }
}

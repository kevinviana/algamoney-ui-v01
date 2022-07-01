import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  // pessoa = new Pessoa();
  formulario!: FormGroup;

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      ativo: [true, Validators.required],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
    });
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  atualizarPessoa(): void {
    this.pessoaService
      .atualizar(this.formulario.value)
      .then((pessoa) => {
        // this.pessoa = pessoa;
        this.formulario.setValue(pessoa);
        this.atualizarTituloEdicao();
        this.mesageService.add({
          severity: 'success',
          detail: 'Pessoa alterada com sucesso',
        });
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  adicionarPessoa(): void {
    this.pessoaService
      .add(this.formulario.value)
      .then((pessoa) => {
        this.mesageService.add({
          severity: 'success',
          detail: 'Pessoa cadastrada com sucesso',
        });
        this.router.navigate(['/pessoas', pessoa.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then((pessoa) => {
      // this.pessoa = pessoa;
      this.formulario.patchValue(pessoa);
      this.atualizarTituloEdicao();
    });
  }

  get editando(): boolean {
    return Boolean(this.formulario.get('codigo')?.value);
  }

  atualizarTituloEdicao(): void {
    this.title.setTitle(
      `Edição de pessoa: ${this.formulario.get('nome')?.value}`
    );
  }

  novo() {
    this.formulario.reset(new Pessoa());

    // setTimeout(() => (this.pessoa = new Pessoa()), 1);

    this.router.navigate(['novo']);
  }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');
    this.configurarFormulario();
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }
}

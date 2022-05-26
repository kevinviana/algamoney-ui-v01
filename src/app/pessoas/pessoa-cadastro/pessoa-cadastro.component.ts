import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private errorHandler: ErrorHandlerService
  ) {}

  pessoa = new Pessoa();

  salvar(pessoaForm: NgForm): void {
    this.pessoaService
      .add(this.pessoa)
      .then(()=>{
        this.mesageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso'});
        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  ngOnInit(): void {}
}

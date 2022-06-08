import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

import { SharedModule } from '../shared/shared.module';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    SharedModule,
    PessoasRoutingModule
  ],
})
export class PessoasModule {}

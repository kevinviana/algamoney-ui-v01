import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../seguranca/auth.service';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [
    MessageService,
    ConfirmationService,
    Title,

    ErrorHandlerService,
    DatePipe,
    TranslateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
  ],
})
export class CoreModule {}

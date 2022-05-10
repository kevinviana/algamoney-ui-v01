import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})
export class LancamentoCadastroComponent {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentação', value: '1' },
    { label: 'Transporte', value: '1' },
  ];

  pessoas = [
    { label: 'Jimmi Hendrix', value: '1' },
    { label: 'Kurt Cobain', value: '2' },
    { label: 'Taylor Hawkins', value: '3' },
  ];
}

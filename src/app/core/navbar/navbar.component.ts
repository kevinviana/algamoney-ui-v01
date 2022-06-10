import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean = false;
  usuarioLogado: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }
}

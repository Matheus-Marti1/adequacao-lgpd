import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AvaliacaoService } from '../../services/avaliacao';
import { inject } from '@angular/core';

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  private avaliacaoService = inject(AvaliacaoService);

  limparDados() {
    if (confirm("Tem certeza que deseja apagar todos os dados salvos e criptografados? Esta ação não pode ser desfeita.")) {
      this.avaliacaoService.limparProgresso();
      alert("Dados removidos com sucesso.");
    }
  }
}

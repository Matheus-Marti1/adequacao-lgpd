import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AvaliacaoService, PerguntaLGPD } from "../../services/avaliacao";

@Component({
  selector: "app-relatorio",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./relatorio.html",
  styleUrl: "./relatorio.css",
})
export class Relatorio {
  private avaliacaoService = inject(AvaliacaoService);

  todasRespostas: PerguntaLGPD[] = [];
  pontosAtencao: PerguntaLGPD[] = [];
  taxaConformidade: number = 0;

  ngOnInit() {
    this.todasRespostas = this.avaliacaoService.getRespostas();
    this.pontosAtencao = this.todasRespostas.filter(
      (p) =>
        p.respostaSelecionada === "Não" ||
        p.respostaSelecionada === "Parcialmente" ||
        p.respostaSelecionada === null,
    );

    const qtdSim = this.todasRespostas.filter(
      (p) => p.respostaSelecionada === "Sim",
    ).length;
    if (this.todasRespostas.length > 0) {
      this.taxaConformidade = Math.round(
        (qtdSim / this.todasRespostas.length) * 100,
      );
    }
  }

  imprimirRelatorio() {
    window.print();
  }
}

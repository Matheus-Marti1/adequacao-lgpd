import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AvaliacaoService, PerguntaLGPD } from "../../services/avaliacao";

@Component({
  selector: "app-questionario",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./questionario.html",
  styleUrl: "./questionario.css",
})
export class Questionario {
  private router = inject(Router);
  private avaliacaoService = inject(AvaliacaoService);
  listaPerguntas: PerguntaLGPD[] = [
    {
      id: 1,
      artigo: "Art. 37",
      tema: "Mapeamento de Dados",
      pergunta: "Pergunta 1",
      respostaSelecionada: null,
      sugestaoMelhoria: "Sugestão 1",
    },
    {
      id: 2,
      artigo: "Art. 8º, § 1º",
      tema: "Consentimento",
      pergunta: "Pergunta 2",
      respostaSelecionada: null,
      sugestaoMelhoria: "Sugestão 2",
    },
    {
      id: 3,
      artigo: "Art. 46",
      tema: "Segurança da Informação",
      pergunta: "Pergunta 3",
      respostaSelecionada: null,
      sugestaoMelhoria: "Sugestão 3",
    },
  ];

  finalizarAvaliacao() {
    const perguntasSemResposta = this.listaPerguntas.filter(
      (p) => p.respostaSelecionada === null,
    );

    if (perguntasSemResposta.length > 0) {
      alert(
        `Ainda faltam ${perguntasSemResposta.length} perguntas para responder.`,
      );
      return;
    }
    this.avaliacaoService.setRespostas(this.listaPerguntas);

    this.router.navigate(["/relatorio"]);
  }
}

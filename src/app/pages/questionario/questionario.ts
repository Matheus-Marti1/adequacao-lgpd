import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface PerguntaLGPD {
  id: number;
  artigo: string;
  tema: string;
  pergunta: string;
  respostaSelecionada: "Sim" | "Não" | "Parcialmente" | null;
  sugestaoMelhoria: string;
}

@Component({
  selector: "app-questionario",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./questionario.html",
  styleUrl: "./questionario.css",
})
export class Questionario {
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
    console.log("Respostas prontas para o relatório:", this.listaPerguntas);
    alert(
      "Todas as respostas registradas! Próximo passo: enviar para a tela de relatório.",
    );
  }
}

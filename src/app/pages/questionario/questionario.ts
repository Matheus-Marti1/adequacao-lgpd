import { Component, inject, OnInit } from "@angular/core";
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
export class Questionario implements OnInit {
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

  ngOnInit() {
    const dadosRecuperados = this.avaliacaoService.getRespostas();
    
    if (dadosRecuperados && dadosRecuperados.length > 0) {
      this.listaPerguntas = dadosRecuperados;
    }
  }

  get porcentagemConcluida(): number {
  if (this.listaPerguntas.length === 0) return 0;
  
  const respondidas = this.listaPerguntas.filter(p => p.respostaSelecionada !== null).length;
  
  return Math.round((respondidas / this.listaPerguntas.length) * 100);
}

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

  salvarRascunho() {
    this.avaliacaoService.setRespostas(this.listaPerguntas);
  }
}

import { Injectable } from "@angular/core";

export interface PerguntaLGPD {
  id: number;
  artigo: string;
  tema: string;
  pergunta: string;
  respostaSelecionada: "Sim" | "Não" | "Parcialmente" | null;
  sugestaoMelhoria: string;
}

@Injectable({
  providedIn: "root",
})
export class AvaliacaoService {
  private respostasGuardadas: PerguntaLGPD[] = [];

  constructor() {}

  setRespostas(dados: PerguntaLGPD[]) {
    this.respostasGuardadas = dados;
  }

  getRespostas(): PerguntaLGPD[] {
    return this.respostasGuardadas;
  }
}

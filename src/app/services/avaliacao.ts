import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

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
  private chaveSecreta = 'CHAVE_SECRETA'; 
  
  private chaveStorage = 'dados_salvos_avaliacao';

  private respostasGuardadas: PerguntaLGPD[] = [];

  constructor() { 
    this.carregarProgresso();
  }

  setRespostas(dados: PerguntaLGPD[]) {
    this.respostasGuardadas = dados;
    
    const dadosEmTexto = JSON.stringify(dados);
    
    const dadosCriptografados = CryptoJS.AES.encrypt(dadosEmTexto, this.chaveSecreta).toString();
    
    localStorage.setItem(this.chaveStorage, dadosCriptografados);
  }

  getRespostas(): PerguntaLGPD[] {
    return this.respostasGuardadas;
  }

  private carregarProgresso() {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      try {
        const bytes = CryptoJS.AES.decrypt(dadosSalvos, this.chaveSecreta);
        const dadosDescriptografados = bytes.toString(CryptoJS.enc.Utf8);
        
        this.respostasGuardadas = JSON.parse(dadosDescriptografados);
      } catch (error) {
        console.error('Erro ao tentar ler os dados salvos. Podem estar corrompidos.', error);
        localStorage.removeItem(this.chaveStorage);
        this.respostasGuardadas = [];
      }
    }
  }

  limparProgresso() {
    localStorage.removeItem(this.chaveStorage);
    this.respostasGuardadas = [];
  }
}

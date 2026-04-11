import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AvaliacaoService, PerguntaLGPD } from "../../services/avaliacao";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';

@Component({
  selector: "app-relatorio",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./relatorio.html",
  styleUrl: "./relatorio.css",
})
export class Relatorio implements OnInit {
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

  async gerarPDF() {
    const definicaoDocumento: any = {
      content: [
        { text: 'Relatório de Adequação - LGPD', style: 'titulo' },
        { text: `Índice de Conformidade: ${this.taxaConformidade}%`, style: 'subtitulo' },
        { text: '\nPlano de Ação e Melhorias', style: 'secao' },
        { text: 'Os itens abaixo requerem atenção imediata para adequação à legislação:\n\n', fontSize: 10, color: '#475569' }
      ],
      styles: {
        titulo: { fontSize: 18, bold: true, color: '#1a365d', margin: [0, 0, 0, 5] },
        subtitulo: { fontSize: 14, color: '#2563eb', margin: [0, 0, 0, 20] },
        secao: { fontSize: 14, bold: true, color: '#b91c1c', margin: [0, 10, 0, 5] },
        artigo: { fontSize: 12, bold: true, color: '#334155', margin: [0, 10, 0, 2] },
        pergunta: { fontSize: 10, italics: true, margin: [0, 0, 0, 5] },
        sugestao: { fontSize: 10, color: '#1e3a8a', margin: [0, 0, 0, 15] }
      }
    };

    if (this.pontosAtencao.length === 0) {
      definicaoDocumento.content.push({ text: 'Parabéns! Nenhuma não-conformidade encontrada.', color: '#166534' });
    } else {
      this.pontosAtencao.forEach(item => {
        definicaoDocumento.content.push(
          { text: `Tema: ${item.tema} | ${item.artigo}`, style: 'artigo' },
          { text: `Avaliação: ${item.pergunta}`, style: 'pergunta' },
          { text: `Recomendação: ${item.sugestaoMelhoria}`, style: 'sugestao' }
        );
      });
    }

    try {
      const fontesVFS = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : (pdfFonts as any).vfs;

      const construtorPdf = (pdfMake as any).default ? (pdfMake as any).default : pdfMake;
      const geradorPdf = construtorPdf.createPdf(definicaoDocumento, undefined, undefined, fontesVFS);
      
      const blob = await geradorPdf.getBlob();
        
      const caminhoArquivo = await save({
        filters: [{ name: 'Documento PDF', extensions: ['pdf'] }],
        defaultPath: 'Relatorio_Adequacao_LGPD.pdf'
      });

      if (!caminhoArquivo) return;

      const arrayBuffer = await blob.arrayBuffer();
      const dadosBinarios = new Uint8Array(arrayBuffer);

      await writeFile(caminhoArquivo, dadosBinarios);
      alert('Relatório em PDF salvo com sucesso!');

    } catch (erro) {
      console.error('Erro ao gerar/salvar PDF:', erro);
      alert('Ocorreu um erro ao gerar o PDF.');
    }
  }
}


# Diagnóstico de Conformidade LGPD

Um software desktop leve e offline desenvolvido para apoiar empresas na avaliação e adequação à Lei Geral de Proteção de Dados (LGPD), gerando planos de ação baseados em questionários.

## Como rodar o projeto localmente

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Rust](https://www.rust-lang.org/tools/install) (necessário para compilar o motor do Tauri)

### Executando a aplicação

1. Abra o terminal na pasta raiz do projeto.
2. Instale as dependências do front-end (Angular) executando o comando:
   ```bash
   npm install
   ```
3. Inicie o aplicativo em modo de desenvolvimento executando:
   ```bash
   npm run tauri dev
   ```

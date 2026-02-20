# Language Learner Extension

Uma extensão leve para o Google Chrome focada no aprendizado de idiomas. Ao clicar duas vezes em uma palavra na web, a extensão consulta uma API estática (hospedada via GitHub Pages) e apresenta um quiz interativo para testar seu vocabulário.

Desenvolvida com TypeScript, aplicando rigorosamente **Clean Architecture**, **Domain-Driven Design (DDD)** e **Object Calisthenics**.

## 🚀 Funcionalidades

- **Interação Rápida:** Reconhecimento automático de palavras via duplo clique (seleção de texto).
- **Quiz Dinâmico:** Múltiplas opções de tradução/significado para a palavra selecionada.
- **Feedback Imediato:** Validação visual de acerto ou erro.
- **Modo Aleatório:** Navegação para novas palavras sortidas diretamente do popup.
- **Serverless:** Alimentada por um arquivo `.json` estático no GitHub Pages.

## 🛠️ Pré-requisitos

Certifique-se de ter o seguinte instalado em seu ambiente (testado em distribuições Linux como Ubuntu 24.04):
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- NPM ou Yarn
- Google Chrome ou navegadores baseados em Chromium

## 📦 Como Compilar

1. **Clone o repositório:**
```bash
   git clone https://github.com/luizhanauer/hop-words.git
   cd hop-words
```

2. **Instale as dependências:**
```bash
npm install
```


3. **Compile o código TypeScript:**
```bash
npm run build
```
*Isso irá gerar os arquivos JavaScript transpilados dentro da pasta `dist/`.*

## 🌐 Configurando a API Estática

1. Crie um repositório no GitHub para servir os arquivos estáticos ou use o mesmo da extensão.
2. Adicione o arquivo `words.json` (conforme modelo da documentação) na raiz do repositório ou em uma pasta específica.
3. Ative o **GitHub Pages** nas configurações do repositório.
4. Atualize a constante `API_URL` no arquivo `src/Main.ts` com a URL gerada pelo GitHub Pages antes de compilar.

## 🔌 Como Instalar no Navegador

1. Abra o Google Chrome e acesse a página de extensões digitando na barra de endereços: `chrome://extensions/`.
2. No canto superior direito, ative a opção **Modo do desenvolvedor** (Developer mode).
3. Clique no botão **Carregar sem compactação** (Load unpacked) que aparecerá no canto superior esquerdo.
4. Selecione a pasta raiz do projeto (onde encontra-se o arquivo `manifest.json`).
5. A extensão agora aparecerá na sua lista de extensões e já estará ativa.

## 💡 Como Usar

1. Navegue até qualquer página da web.
2. Dê um **duplo clique** em uma palavra em inglês (ex: `always` ou `never`, de acordo com o seu `words.json`).
3. Uma pequena janela (tooltip) aparecerá próxima à palavra com as opções de tradução.
4. Selecione uma opção para receber o feedback e, se desejar, clique em "Próxima Palavra Aleatória" para continuar praticando.

```

---

### 2. Arquivos de Configuração Necessários

Para que o comando `npm run build` descrito no README funcione, você precisará destes dois arquivos na raiz do seu projeto.

**`package.json`**
```json
{
  "name": "language-learner-extension",
  "version": "1.0.0",
  "description": "Extensão para aprendizado de idiomas com API estática",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}

```

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}


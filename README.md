# Aplicação web com Node.js e Express

Exemplo simples de rotas e arquivos estáticos, com as páginas DSM existentes e interfaces demonstrativas de login e cadastro. Sem banco de dados, autenticação ou validação de formulários.

## Requisitos e execução

Use Node.js 22 ou superior, com npm.

```sh
npm install
```

O projeto já tem um `.env` local. Em uma nova cópia, crie esse arquivo a partir de `.env.example`:

```sh
cp .env.example .env
```

Defina a porta desejada no `.env`:

```dotenv
PORT=3001
```

Inicie o servidor:

```sh
npm start
```

Acesse http://localhost:3001 (ou a porta configurada). Sem `PORT`, o padrão é 3000. O servidor carrega o `.env` pelo caminho do projeto, independentemente da pasta de execução. Variáveis já definidas no ambiente têm prioridade.

Para desenvolvimento:

```sh
npm run dev
```

O modo `node --watch` reinicia ao alterar o servidor ou seus módulos importados. Alterações em HTML, CSS e JavaScript público aparecem ao atualizar o navegador. Após mudar o `.env`, reinicie o comando.

## Estrutura

```text
app/
├── server/
│   └── main.js             # Configuração do Express e rotas
├── public/
│   ├── pages/
│   │   ├── index.html      # Página inicial
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── 404.html
│   │   └── 1dsm.html … 6dsm.html
│   └── assets/
│       ├── css/index.css   # Estilos compartilhados
│       ├── js/forms.js     # Mensagem de demonstração dos formulários
│       └── images/         # Logos existentes
├── .env                    # Configuração local, ignorada pelo Git
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Rotas

| Endereço | Resposta |
| --- | --- |
| `/` | Página inicial |
| `/login` | Interface de login |
| `/cadastro` | Interface de cadastro |
| `/1dsm` até `/6dsm` | Páginas existentes dos semestres |
| `/assets/*` | CSS, JavaScript e imagens |
| Qualquer endereço inexistente | Página HTML com status HTTP 404 |

O Express usa `res.sendFile` com caminhos absolutos para os HTMLs. O middleware `express.static` expõe somente `public/assets`, pelo prefixo `/assets`. Por isso, o CSS é referenciado como `/assets/css/index.css`, inclusive em rotas aninhadas. O fallback 404 fica por último, após os arquivos estáticos e as rotas.

Os formulários apenas exibem uma mensagem de demonstração e limpam os campos. Não enviam dados, não criam usuários e não iniciam sessões. Os campos não têm atributo `name`, evitando transmitir seus valores mesmo se o JavaScript estiver desativado.

## Referências

- [Arquivos estáticos no Express](https://expressjs.com/en/starter/static-files/)
- [Modo watch do Node.js](https://nodejs.org/api/cli.html#--watch)

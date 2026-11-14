import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverPath = path.dirname(fileURLToPath(import.meta.url));
const projectPath = path.join(serverPath, "..");
const publicPath = path.join(projectPath, "public");
const pagesPath = path.join(publicPath, "pages");

// O caminho absoluto permite executar o servidor de qualquer pasta.
dotenv.config({ path: path.join(projectPath, ".env"), quiet: true });
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT deve ser um número inteiro entre 1 e 65535.");
}

const app = express();

// Expõe CSS, imagens e JavaScript; os HTMLs são servidos pelas rotas.
app.use("/assets", express.static(path.join(publicPath, "assets")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(pagesPath, "index.html"));
});
app.get("/login", (_req, res) => {
  res.sendFile(path.join(pagesPath, "login.html"));
});
app.get("/cadastro", (_req, res) => {
  res.sendFile(path.join(pagesPath, "cadastro.html"));
});

// Preserva as páginas dos semestres existentes.
for (let semester = 1; semester <= 6; semester += 1) {
  app.get(`/${semester}dsm`, (_req, res) => {
    res.sendFile(path.join(pagesPath, `${semester}dsm.html`));
  });
}

// O fallback precisa vir depois das rotas e dos arquivos estáticos.
app.use((_req, res) => {
  res.status(404).sendFile(path.join(pagesPath, "404.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

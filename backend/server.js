// =====================================================
// COPA DO MUNDO 2026
// Backend principal da aplicação
//
// Responsabilidades:
// - Servir dados dos grupos
// - Gerenciar login administrativo
// - Controlar sessões
// - Salvar e carregar placares
// - Salvar e carregar mata-mata
// - Salvar estado do torneio
// - Executar reset geral
// =====================================================

/*
=====================================================
MAPA DO BACKEND
=====================================================

1. Configuração do Express
2. Configuração de Sessão
3. Rotas de Teste
4. Dados dos Grupos
5. Login e Logout
6. Middleware de Segurança
7. Placares da Fase de Grupos
8. Terceiros Colocados
9. Mata-Mata
10. Estado do Torneio
11. Reset Geral

Arquivos persistidos:

scores.json
thirds-data.json
knockout-data.json
tournament-state.json

=====================================================
*/

// =====================================================
// IMPORTAÇÃO DE MÓDULOS
// =====================================================
const session = require("express-session");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const groups = require("./data/groups");
const fs = require("fs");
const path = require("path");
// =====================================================
// CONFIGURAÇÃO INICIAL DO EXPRESS
// =====================================================
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://caires-tech.github.io"],
    credentials: true,
  }),
);

// Habilita leitura de requisições JSON
app.use(express.json());

// =====================================================
// CONTROLE DE SESSÃO
//
// Utilizado para manter o login do administrador
// entre diferentes requisições.
// =====================================================
app.use(
  session({
    secret: "copa2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    },
  }),
);
// Endpoint simples para verificar se a API está online
app.get("/api/test", (req, res) => {
  res.json({
    message: "API da Copa funcionando",
  });
});
// =====================================================
// DADOS DOS GRUPOS
// =====================================================
// Retorna todos os grupos da Copa
app.get("/api/groups", (req, res) => {
  res.json(groups);
});
// =====================================================
// AUTENTICAÇÃO ADMINISTRATIVA
// =====================================================
// Realiza autenticação do administrador
// utilizando credenciais armazenadas no .env
app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (
    user === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Marca a sessão atual como administrador
    req.session.admin = true;
    // Força o salvamento da sessão antes da resposta
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
        });
      }

      console.log("LOGIN OK");
      console.log(req.session);

      res.json({
        success: true,
      });
    });

    return;
  }

  res.status(401).json({
    success: false,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/save-score", requireAdmin, async (req, res) => {
  const scores = req.body;

  const filePath = path.join(__dirname, "scores.json");

  fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));

  res.json({
    success: true,
    message: "Placares salvos com sucesso",
  });
});

app.get("/scores", (req, res) => {
  const filePath = path.join(__dirname, "scores.json");

  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }

  const fileData = fs.readFileSync(filePath, "utf-8");

  const scores = JSON.parse(fileData);

  res.json(scores);
});
// =====================================================
// TERCEIROS COLOCADOS MANUAIS
// =====================================================
app.get("/thirds", (req, res) => {
  const data = fs.readFileSync("thirds-data.json", "utf8");

  res.json(JSON.parse(data));
});

app.post("/save-thirds", requireAdmin, async (req, res) => {
  fs.writeFileSync("thirds-data.json", JSON.stringify(req.body, null, 2));

  res.json({ success: true });
});
// =====================================================
// MIDDLEWARE DE PROTEÇÃO
//
// Impede acesso a rotas administrativas
// quando o usuário não estiver autenticado.
// =====================================================
function requireAdmin(req, res, next) {
  console.log("Sessão:", req.session);
  if (req.session.admin) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: "Não autorizado",
  });
}
// =====================================================
// ENCERRAMENTO DE SESSÃO
// =====================================================
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true,
    });
  });
});
// =====================================================
// VERIFICAÇÃO DE AUTENTICAÇÃO
// =====================================================
app.get("/check-auth", (req, res) => {
  console.log("CHECK AUTH");
  console.log(req.session);
  res.json({
    admin: !!req.session.admin,
  });
});
// =====================================================
// DADOS DO MATA-MATA
// =====================================================
app.get("/knockout", (req, res) => {
  const filePath = path.join(__dirname, "knockout-data.json");

  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }

  const data = fs.readFileSync(filePath, "utf8");

  res.json(JSON.parse(data));
});

app.post("/save-knockout", requireAdmin, (req, res) => {
  fs.writeFileSync("knockout-data.json", JSON.stringify(req.body, null, 2));

  res.json({
    success: true,
  });
});
// =====================================================
// ESTADO GLOBAL DO TORNEIO
//
// Exemplo:
// {
//   knockoutGenerated: true
// }
// =====================================================
app.get("/tournament-state", (req, res) => {
  const filePath = path.join(__dirname, "tournament-state.json");

  if (!fs.existsSync(filePath)) {
    return res.json({
      knockoutGenerated: false,
    });
  }

  const data = fs.readFileSync(filePath, "utf8");

  res.json(JSON.parse(data));
});

app.post("/save-tournament-state", requireAdmin, (req, res) => {
  fs.writeFileSync("tournament-state.json", JSON.stringify(req.body, null, 2));

  res.json({
    success: true,
  });
});
// =====================================================
// RESET COMPLETO DO TORNEIO
//
// Apaga:
// - Placares dos grupos
// - Terceiros colocados
// - Mata-mata
// - Estado do torneio
// =====================================================
app.post("/reset-tournament", requireAdmin, (req, res) => {
  fs.writeFileSync("scores.json", JSON.stringify([], null, 2));

  fs.writeFileSync("thirds-data.json", JSON.stringify({}, null, 2));

  fs.writeFileSync("knockout-data.json", JSON.stringify([], null, 2));

  fs.writeFileSync(
    "tournament-state.json",
    JSON.stringify(
      {
        knockoutGenerated: false,
      },
      null,
      2,
    ),
  );

  res.json({
    success: true,
  });
});

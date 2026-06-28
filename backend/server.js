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

=====================================================
*/

// =====================================================
// IMPORTAÇÃO DE MÓDULOS
// =====================================================
const session = require("express-session");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const groups = require("./data/groups");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
// =====================================================
// CONFIGURAÇÃO INICIAL DO EXPRESS
// =====================================================
const app = express();

app.use(
  cors({
    origin: "https://caires-tech.github.io",
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
app.set("trust proxy", 1);

app.use(
  session({
    secret: "copa2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    },
  }),
);
// Endpoint simples para verificar se a API está online
app.get("/api/test", (req, res) => {
  res.json({
    message: "API da Copa funcionando",
  });
});
// rota de teste simples
app.get("/supabase-test", async (req, res) => {
  try {
    const { data, error } = await supabase.from("app_data").select("*");

    console.log(JSON.stringify(data, null, 2));

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/supabase-save-test", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("app_data")
      .update({
        value: [
          {
            id: "1",
            homeScore: "2",
            awayScore: "1",
          },
        ],
      })
      .eq("key", "scores")
      .select();

    res.json({
      data,
      error,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
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

// Salva dados na tabela supabase
app.post("/save-score", requireAdmin, async (req, res) => {
  try {
    const scores = req.body;
    if (!Array.isArray(scores)) {
      return res.status(400).json({
        error: "Formato inválido de scores",
      });
    }
    const { error } = await supabase
      .from("app_data")
      .update({
        value: scores,
      })
      .eq("key", "scores");

    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      success: true,
      message: "Placares salvos com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Busca dados na tabela supabase
app.get("/scores", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("app_data")
      .select("value")
      .eq("key", "scores")
      .limit(1);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data?.[0]?.value || []);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// =====================================================
// TERCEIROS COLOCADOS MANUAIS
// =====================================================
app.get("/thirds", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("app_data")
      .select("value")
      .eq("key", "thirds")
      .limit(1);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data?.[0]?.value || []);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/save-thirds", requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from("app_data")
      .update({
        value: req.body,
      })
      .eq("key", "thirds");

    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      success: true,
      message: "Thirds salvos com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
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
  console.log(req.session);
  res.json({
    admin: !!req.session.admin,
  });
});
// =====================================================
// DADOS DO MATA-MATA
// =====================================================
app.get("/knockout", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("app_data")
      .select("value")
      .eq("key", "knockout")
      .limit(1);

    if (error) return res.status(500).json(error);

    res.json(data?.[0]?.value || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/save-knockout", requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from("app_data")
      .update({ value: req.body })
      .eq("key", "knockout");

    if (error) return res.status(500).json(error);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// =====================================================
// ESTADO GLOBAL DO TORNEIO
// =====================================================
app.get("/tournament-state", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("app_data")
      .select("value")
      .eq("key", "tournament_state")
      .limit(1);

    if (error) return res.status(500).json(error);

    res.json(data?.[0]?.value || { knockoutGenerated: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/save-tournament-state", requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from("app_data")
      .update({ value: req.body })
      .eq("key", "tournament_state");

    if (error) return res.status(500).json(error);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
app.post("/reset-tournament", requireAdmin, async (req, res) => {
  try {
    const resetData = [
      {
        key: "scores",
        value: [],
      },
      {
        key: "thirds",
        value: {},
      },
      {
        key: "knockout",
        value: [],
      },
      {
        key: "tournament_state",
        value: {
          knockoutGenerated: false,
        },
      },
    ];

    for (const item of resetData) {
      const { error } = await supabase
        .from("app_data")
        .update({ value: item.value })
        .eq("key", item.key);

      if (error) {
        return res.status(500).json({
          error,
          step: item.key,
        });
      }
    }

    res.json({
      success: true,
      message: "Torneio resetado com sucesso no Supabase",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

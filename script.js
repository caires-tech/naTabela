// =====================================================
// COPA DO MUNDO 2026
// Arquivo principal de lógica da aplicação
//
// Responsabilidades:
// - Calcular classificação dos grupos
// - Identificar classificados
// - Gerenciar mata-mata
// - Controlar autenticação administrativa
// - Salvar e recuperar dados do servidor
// - Determinar campeão do torneio
// =====================================================

// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

// Armazena terceiros colocados definidos manualmente pelo admin
let manualThirds = {};
// Indica se a fase eliminatória já foi liberada
let knockoutGenerated = false;
// Dados completos dos grupos carregados da API
let groups = [];
// Referências dos controles administrativos
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const generateBracketBtn = document.getElementById("generateBracketBtn");
const resetBracketBtn = document.getElementById("resetBracketBtn");

// =====================================================
// CALCULA A CLASSIFICAÇÃO DOS GRUPOS
//
// Responsável por:
// - Ler todos os placares
// - Calcular estatísticas
// - Ordenar a classificação
// - Definir classificados
// - Identificar os melhores terceiros colocados
// =====================================================
function updateStandings() {
  // Objeto global utilizado posteriormente
  // para calcular os melhores terceiros colocados
  const statsGlobal = {};
  const container = document.getElementById("groupsContainer");
  if (!container) return;
  groups.forEach((group) => {
    // Reinicia todas as estatísticas do grupo
    // antes de recalcular os resultados
    const stats = {};
    group.teams.forEach((team) => {
      stats[team.name] = {
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
      };
      statsGlobal[team.name] = stats[team.name];
    });
    // Percorre todos os jogos do grupo
    // e atualiza os números das seleções
    group.matches.forEach((match) => {
      const matchElement = document.querySelector(
        `[data-match-id="${match.id}"]`,
      );
      if (!matchElement) return;

      const inputs = matchElement.querySelectorAll(".score-input");
      if (!inputs || inputs.length < 2) return;

      // VALIDAÇÃO: Se o input estiver vazio, define explicitamente como NaN
      const homeScore =
        inputs[0].value.trim() !== "" ? parseInt(inputs[0].value) : NaN;
      const awayScore =
        inputs[1].value.trim() !== "" ? parseInt(inputs[1].value) : NaN;

      // Ignora jogo sem placar valido
      if (isNaN(homeScore) || isNaN(awayScore)) return;

      const homeTeam = stats[match.home];
      const awayTeam = stats[match.away];

      if (!homeTeam || !awayTeam) return;

      // Gols
      homeTeam.goalsFor += homeScore;
      homeTeam.goalsAgainst += awayScore;
      awayTeam.goalsFor += awayScore;
      awayTeam.goalsAgainst += homeScore;

      // Saldo
      homeTeam.goalDiff = homeTeam.goalsFor - homeTeam.goalsAgainst;
      awayTeam.goalDiff = awayTeam.goalsFor - awayTeam.goalsAgainst;

      // Resultado
      if (homeScore > awayScore) {
        homeTeam.points += 3;
        homeTeam.wins += 1;
        awayTeam.losses += 1;
      } else if (homeScore < awayScore) {
        awayTeam.points += 3;
        awayTeam.wins += 1;
        homeTeam.losses += 1;
      } else {
        homeTeam.points += 1;
        awayTeam.points += 1;
        homeTeam.draws += 1;
        awayTeam.draws += 1;
      }
    });

    // Atualizar tabela visual
    group.teams.forEach((team) => {
      const row = document.querySelector(`[data-team="${team.name}"]`);
      if (!row) return;

      const teamStats = stats[team.name];
      const cells = row.querySelectorAll("td");

      if (cells.length >= 8) {
        cells[1].textContent = teamStats.points;
        cells[2].textContent = teamStats.wins;
        cells[3].textContent = teamStats.draws;
        cells[4].textContent = teamStats.losses;
        cells[5].textContent = teamStats.goalsFor;
        cells[6].textContent = teamStats.goalsAgainst;
        cells[7].textContent = teamStats.goalDiff;
      }
    });

    // Ordenar Classificação
    const groupIndex = groups.indexOf(group) + 1;
    const tbody = document.querySelector(
      `.group-box:nth-child(${groupIndex}) tbody`,
    );
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.sort((a, b) => {
      const teamA = a.dataset.team;
      const teamB = b.dataset.team;
      const statsA = stats[teamA];
      const statsB = stats[teamB];
      if (!statsA || !statsB) return 0;
      // Pontos
      if (statsB.points !== statsA.points) return statsB.points - statsA.points;
      // Saldo
      if (statsB.goalDiff !== statsA.goalDiff)
        return statsB.goalDiff - statsA.goalDiff;
      // Gols pró
      if (statsB.goalsFor !== statsA.goalsFor)
        return statsB.goalsFor - statsA.goalsFor;
      // Confronto direto
      let directA = 0;
      let directB = 0;
      group.matches.forEach((match) => {
        const isDirectMatch =
          (match.home === teamA && match.away === teamB) ||
          (match.home === teamB && match.away === teamA);
        if (!isDirectMatch) return;
        const matchElement = document.querySelector(
          `[data-match-id="${match.id}"]`,
        );
        if (!matchElement) return;
        const inputs = matchElement.querySelectorAll(".score-input");
        if (!inputs || inputs.length < 2) return;
        // Validação segura dentro do sort
        const homeScore =
          inputs[0].value.trim() !== "" ? parseInt(inputs[0].value) : NaN;
        const awayScore =
          inputs[1].value.trim() !== "" ? parseInt(inputs[1].value) : NaN;
        if (isNaN(homeScore) || isNaN(awayScore)) return;
        if (match.home === teamA) {
          if (homeScore > awayScore) directA += 3;
          else if (homeScore < awayScore) directB += 3;
          else {
            directA += 1;
            directB += 1;
          }
        }
        if (match.home === teamB) {
          if (homeScore > awayScore) directB += 3;
          else if (homeScore < awayScore) directA += 3;
          else {
            directA += 1;
            directB += 1;
          }
        }
      });
      if (directB !== directA) return directB - directA;
      return 0;
    });
    rows.forEach((row) => {
      row.classList.remove("qualified");
      tbody.appendChild(row);
    });
    if (rows[0]) rows[0].classList.add("qualified");
    if (rows[1]) rows[1].classList.add("qualified");
  });
  // Melhores terceiros
  const thirdPlacedTeams = [];
  groups.forEach((group) => {
    const groupIndex = groups.indexOf(group) + 1;
    const tbody = document.querySelector(
      `.group-box:nth-child(${groupIndex}) tbody`,
    );
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const thirdRow = rows[2];
    if (!thirdRow) return;
    const teamName = thirdRow.dataset.team;
    const teamStats = statsGlobal[teamName];
    if (teamStats) {
      thirdPlacedTeams.push({
        row: thirdRow,
        name: teamName,
        points: teamStats.points,
        goalDiff: teamStats.goalDiff,
        goalsFor: teamStats.goalsFor,
      });
    }
  });

  // Ordenar terceiros
  thirdPlacedTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return 0;
  });

  document
    .querySelectorAll(".best-third")
    .forEach((row) => row.classList.remove("best-third"));

  thirdPlacedTeams
    .slice(0, 8)
    .forEach((team) => team.row.classList.add("best-third"));

  if (knockoutGenerated) {
    updateBracketTeams();
  }
}
// =====================================================
// RETORNA TODOS OS CLASSIFICADOS
//
// Exemplo:
// {
//   1A: "Brasil",
//   2A: "Holanda",
//   3C: "México"
// }
// =====================================================
function getQualifiedTeams() {
  const qualified = {};
  groups.forEach((group) => {
    const tbody = document.querySelector(
      `.group-box:nth-child(${groups.indexOf(group) + 1}) tbody`,
    );
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));

    if (rows[0])
      qualified[`1${group.name.split(" ")[1]}`] = rows[0].dataset.team;
    if (rows[1])
      qualified[`2${group.name.split(" ")[1]}`] = rows[1].dataset.team;
    if (rows[2] && rows[2].classList.contains("best-third")) {
      qualified[`3${group.name.split(" ")[1]}`] = rows[2].dataset.team;
    }
  });
  return qualified;
}
// =====================================================
// ATUALIZA OS TIMES NAS CHAVES
//
// Preenche automaticamente:
//
// 1A, 2A, 3A...
// W74, W75...
// RU101, RU102...
//
// Também habilita edição manual dos
// terceiros colocados para administradores.
// =====================================================
function updateBracketTeams() {
  const qualified = getQualifiedTeams();

  document.querySelectorAll(".team-line[data-slot]").forEach((slot) => {
    const key = slot.dataset.slot;
    if (key.startsWith("W") || key.startsWith("RU")) return;

    if (key.startsWith("3")) {
      if (manualThirds[key]) {
        slot.textContent = manualThirds[key];
      } else {
        slot.textContent = qualified[key] || key;
      }

      const isAdmin = localStorage.getItem("admin") === "true";
      if (isAdmin) {
        slot.contentEditable = true;
        slot.classList.add("editable-third");
      } else {
        slot.contentEditable = false;
        slot.classList.remove("editable-third");
      }
      return;
    }
    slot.textContent = qualified[key] || key;
  });
  updateAdminControls();
}
// =====================================================
// CRIA CAMPOS DE PÊNALTIS
//
// Os inputs são criados dinamicamente
// para todas as partidas do mata-mata.
// =====================================================
function createPenaltyInputs() {
  document.querySelectorAll(".knockout-team").forEach((team) => {
    if (team.querySelector(".ko-penalty")) return;

    const penaltyInput = document.createElement("input");
    penaltyInput.type = "number";
    penaltyInput.min = "0";
    penaltyInput.max = "99";
    penaltyInput.classList.add("ko-penalty", "hidden-penalty");
    team.appendChild(penaltyInput);
  });
}

// =====================================================
// INICIALIZAÇÃO DA APLICAÇÃO
//
// Fluxo:
//
// 1. Carrega grupos da API
// 2. Monta tabelas na tela
// 3. Cria campos de pênaltis
// 4. Recupera autenticação
// 5. Carrega dados salvos
// 6. Atualiza classificações
// 7. Configura eventos da interface
// =====================================================
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("groupsContainer");

  // 1. CARREGAR OS GRUPOS E MONTAR O DOM PRIMEIRO
  try {
    const response = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/api/groups",
    );
    groups = await response.json();
  } catch (err) {
    console.error("Erro ao buscar grupos da API:", err);
    document.getElementById("loading-indicator").innerHTML =
      "<p>⚠️ Não foi possível carregar os dados.</p>";
    return;
  }

  if (!container) return;

  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const groupBox = document.createElement("div");
    groupBox.classList.add("group-box");

    const teamsHTML = group.teams
      .map(
        (team) => `
        <tr data-team="${team.name}">
          <td class="team-name">
            <img class="flag" src="${team.flag}" alt="${team.name}">
            <span>${team.name}</span>
          </td>
          <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
        </tr>
      `,
      )
      .join("");

    const matchesHTML = group.matches
      .map(
        (match) => `
        <div class="match" data-date="${match.date}" data-match-id="${match.id}">
          <div class="match-info">
            <span>${match.date}</span> <span class="dot">•</span>
            <span>${match.time}</span> <span class="dot">•</span>
            <span>${match.location}</span>
          </div>
          <div class="match-teams">
            <div class="team-side left-team">${match.home}</div>
            <div class="score-center">
              <input type="number" class="score-input" min="0" max="99" inputmode="numeric"/>
              <strong class="versus">X</strong>
              <input type="number" class="score-input" min="0" max="99" inputmode="numeric"/>
            </div>
            <div class="team-side right-team">${match.away}</div>
          </div>
        </div>
      `,
      )
      .join("");

    groupBox.innerHTML = `
      <h2>${group.name}</h2>
      <table>
        <thead>
          <tr><th>Seleção</th><th>PTS</th><th>VIT</th><th>EMP</th><th>DER</th><th>GP</th><th>GC</th><th>SG</th></tr>
        </thead>
        <tbody>${teamsHTML}</tbody>
      </table>
      <div class="matches">${matchesHTML}</div>
    `;
    fragment.appendChild(groupBox);
  });

  container.appendChild(fragment);

  // Esconde o spinner quando os grupos estiverem carregados
  document.getElementById("loading-indicator").style.display = "none";

  // 2. CRIAR OS INPUTS DE PÊNALTI NO MATA-MATA
  createPenaltyInputs();

  // 3. RECUPERAR AUTENTICAÇÃO E CONFIGURAR ESTADOS LOCAIS
  try {
    const authResponse = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/check-auth",
      {
        credentials: "include",
      },
    );
    const authData = await authResponse.json();
    console.log("Auth status:", authData);
  } catch (e) {
    console.error("Erro ao checar autenticação:", e);
  }

  const isAdmin = localStorage.getItem("admin") === "true";
  const stateResponse = await fetch(
    "https://copa-do-mundo-2026-7gbp.onrender.com/tournament-state",
  );
  const stateData = await stateResponse.json();

  knockoutGenerated = stateData.knockoutGenerated;

  console.log("Admin logado:", isAdmin);
  if (isAdmin) {
    saveBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    generateBracketBtn.classList.remove("hidden");
    resetBracketBtn.classList.remove("hidden");
  }

  // 4. CARREGAR DADOS SALVOS DA FASE DE GRUPOS E TERCEIROS
  try {
    const scoresResponse = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/scores",
    );
    const savedScores = await scoresResponse.json();
    const thirdsResponse = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/thirds",
    );
    const savedThirds = await thirdsResponse.json();

    manualThirds = savedThirds;

    savedScores.forEach((savedMatch) => {
      const matchElement = document.querySelector(
        `[data-match-id="${savedMatch.id}"]`,
      );
      if (!matchElement) return;
      const inputs = matchElement.querySelectorAll(".score-input");
      inputs[0].value = savedMatch.homeScore;
      inputs[1].value = savedMatch.awayScore;
    });
  } catch (err) {
    console.error("Erro ao carregar dados salvos da fase de grupos:", err);
  }

  // 5. CARREGAR PLACARES SALVOS DO MATA-MATA
  try {
    const knockoutResponse = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/knockout",
    );
    const knockoutData = await knockoutResponse.json();

    knockoutData.forEach((match) => {
      const box = document.querySelector(
        `.match-box[data-match="${match.matchId}"]`,
      );

      if (!box) return;

      const scores = box.querySelectorAll(".ko-score");
      const penalties = box.querySelectorAll(".ko-penalty");

      if (scores[0]) scores[0].value = match.scoreA;
      if (scores[1]) scores[1].value = match.scoreB;
      if (penalties[0]) penalties[0].value = match.penaltyA;
      if (penalties[1]) penalties[1].value = match.penaltyB;
    });
  } catch (err) {
    console.error("Erro ao carregar dados salvos do knockout:", err);
  }

  // 6. EXECUTAR CÁLCULOS E ATUALIZAÇÕES VISUAIS
  updateStandings();
  if (knockoutGenerated) {
    updateBracketTeams();
  }
  updatePenaltyInputs();
  updateKnockoutWinners();
  updateAdminControls();

  // Cliques manuais para os terceiros colocados
  document.addEventListener("click", (event) => {
    const isAdminActive = localStorage.getItem("admin") === "true";
    if (!isAdminActive || !event.target.classList.contains("team-line")) return;

    const slot = event.target.dataset.slot;
    if (!slot || !slot.startsWith("3")) return;

    const teamName = prompt("Digite a seleção:");
    if (!teamName) return;

    manualThirds[slot] = teamName;
    updateBracketTeams();
  });

  // Botões de rolagem das tabelas
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");

  if (leftBtn && rightBtn) {
    rightBtn.addEventListener("click", () => {
      container.scrollLeft += 650;
    });
    leftBtn.addEventListener("click", () => {
      container.scrollLeft -= 650;
    });
  }

  // DESTACAR JOGOS DO DIA
  const today = new Date();
  const currentDay = String(today.getDate()).padStart(2, "0");
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const todayString = `${currentDay}/${currentMonth}`;

  document.querySelectorAll("[data-date]").forEach((match) => {
    if (match.dataset.date === todayString) {
      match.classList.add("today-match");
    }
  });

  generateBracketBtn.addEventListener("click", async () => {
    knockoutGenerated = true;

    await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/save-tournament-state",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          knockoutGenerated: true,
        }),
      },
    );

    updateBracketTeams();
    alert("Fase de grupos finalizada!");
  });
});

// =========================================
// REQUISIÇÕES E EVENTOS DE LOGIN / ADMIN
// =========================================

fetch("https://copa-do-mundo-2026-7gbp.onrender.com/api/test")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Tratamento de input numérico nos placares da fase de grupos
document.addEventListener("input", (event) => {
  if (event.target.classList.contains("score-input")) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (value.length > 2) value = value.slice(0, 2);
    if (value !== "") value = Math.min(parseInt(value), 99).toString();

    event.target.value = value;
    updateStandings();
  }
});

// Tratamento dos placares e penalidades do mata-mata
document.addEventListener("input", (event) => {
  if (
    event.target.classList.contains("ko-score") ||
    event.target.classList.contains("ko-penalty")
  ) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    if (value.length > 2) value = value.slice(0, 2);
    if (value !== "") value = Math.min(parseInt(value), 99).toString();

    event.target.value = value;

    updatePenaltyInputs();
    updateKnockoutWinners();
  }
});
// =====================================================
// SAÍDA DO MODO ADMIN
// =====================================================
logoutBtn.addEventListener("click", async () => {
  await fetch("https://copa-do-mundo-2026-7gbp.onrender.com/logout", {
    method: "POST",
    credentials: "include",
  });

  localStorage.removeItem("admin");
  alert("Logout realizado!");
  window.location.href = "admin.html";
});
// =====================================================
// SALVAR TORNEIO
//
// Persiste:
//
// - Placar da fase de grupos
// - Terceiros colocados manuais
// - Mata-mata completo
// =====================================================
saveBtn.addEventListener("click", async () => {
  const matches = document.querySelectorAll(".match");
  const scores = [];

  matches.forEach((match) => {
    const inputs = match.querySelectorAll(".score-input");
    scores.push({
      id: match.dataset.matchId,
      homeScore: inputs[0].value,
      awayScore: inputs[1].value,
    });
  });

  const response = await fetch(
    "https://copa-do-mundo-2026-7gbp.onrender.com/save-score",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scores),
    },
  );

  const data = await response.json();

  // SALVAR TERCEIROS MANUAIS
  await fetch("https://copa-do-mundo-2026-7gbp.onrender.com/save-thirds", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manualThirds),
  });

  const knockoutMatches = [];

  document.querySelectorAll(".match-box[data-match]").forEach((match) => {
    const matchId = match.dataset.match;
    const scores = match.querySelectorAll(".ko-score");
    const penalties = match.querySelectorAll(".ko-penalty");

    knockoutMatches.push({
      matchId,
      scoreA: scores[0]?.value || "",
      scoreB: scores[1]?.value || "",
      penaltyA: penalties[0]?.value || "",
      penaltyB: penalties[1]?.value || "",
    });
  });

  if (data.success) {
    alert("Placares salvos com sucesso!");
  }

  await fetch("https://copa-do-mundo-2026-7gbp.onrender.com/save-knockout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(knockoutMatches),
  });
});

// DETECÇÃO DE EDIÇÃO DOS TERCEIROS
document.addEventListener(
  "blur",
  (event) => {
    if (event.target.classList.contains("editable-third")) {
      const slot = event.target.dataset.slot;
      manualThirds[slot] = event.target.textContent.trim();
    }
  },
  true,
);
// =====================================================
// CONTROLES DE ADMINISTRAÇÃO
//
// Habilita ou bloqueia:
//
// - Placar dos grupos
// - Placar do mata-mata
// - Edição dos terceiros colocados
// =====================================================
function updateAdminControls() {
  const isAdmin = localStorage.getItem("admin") === "true";

  // Placar da fase de grupos
  document.querySelectorAll(".score-input").forEach((input) => {
    input.disabled = !isAdmin;
  });

  // Placar do mata-mata
  document.querySelectorAll(".ko-score").forEach((input) => {
    input.disabled = !isAdmin;
  });

  // Terceiros colocados
  document.querySelectorAll(".team-line[data-slot]").forEach((slot) => {
    const key = slot.dataset.slot;

    if (key.startsWith("3")) {
      slot.contentEditable = isAdmin;
      slot.classList.toggle("editable-third", isAdmin);
    }
  });
}

// =========================================
// ÚNICO EVENTO DE RESET UNIFICADO
// =========================================
resetBracketBtn.addEventListener("click", async () => {
  if (
    !confirm(
      "Tem certeza que deseja resetar todo o torneio e apagar TODOS os placares?",
    )
  ) {
    return;
  }

  try {
    const response = await fetch(
      "https://copa-do-mundo-2026-7gbp.onrender.com/reset-tournament",
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (data.success) {
      knockoutGenerated = false;
      manualThirds = {};

      alert("Torneio resetado com sucesso! Todos os dados foram zerados.");
      location.reload();
    } else {
      alert("Erro ao resetar o torneio no servidor.");
    }
  } catch (err) {
    console.error("Erro na requisição de reset:", err);
    alert("Erro de conexão ao tentar resetar o torneio.");
  }
});

// =====================================================
// CONTROLE DE PÊNALTIS
//
// Exibe os campos de pênalti somente
// quando o jogo termina empatado.
// =====================================================
function updatePenaltyInputs() {
  document.querySelectorAll(".match-box").forEach((match) => {
    const scores = match.querySelectorAll(".ko-score");
    if (scores.length < 2) return;

    const home = scores[0].value;
    const away = scores[1].value;
    const penalties = match.querySelectorAll(".ko-penalty");
    const isTie =
      home !== "" && away !== "" && parseInt(home) === parseInt(away);

    penalties.forEach((input) => {
      input.classList.toggle("show-penalty", isTie);
    });
    match.classList.toggle("penalty-mode", isTie);
  });
}
// =====================================================
// RETORNA O VENCEDOR DA PARTIDA
//
// Considera:
// 1. Tempo normal
// 2. Disputa por pênaltis
// =====================================================
function getMatchWinner(matchBox) {
  const teams = matchBox.querySelectorAll(".team-line");
  const scores = matchBox.querySelectorAll(".ko-score");
  const penalties = matchBox.querySelectorAll(".ko-penalty");

  if (teams.length < 2 || scores.length < 2) return null;

  const teamA = teams[0].textContent.trim();
  const teamB = teams[1].textContent.trim();
  const scoreA = parseInt(scores[0].value);
  const scoreB = parseInt(scores[1].value);

  if (isNaN(scoreA) || isNaN(scoreB)) return null;

  if (scoreA > scoreB) return teamA;
  if (scoreB > scoreA) return teamB;

  if (penalties.length < 2) return null;
  const penA = parseInt(penalties[0].value);
  const penB = parseInt(penalties[1].value);

  if (isNaN(penA) || isNaN(penB)) return null;
  if (penA > penB) return teamA;
  if (penB > penA) return teamB;

  return null;
}
// =====================================================
// RETORNA O DERROTADO DA PARTIDA
//
// Utilizado principalmente para
// alimentar a disputa de 3º lugar.
// =====================================================
function getMatchRunnerUp(matchBox) {
  const teams = matchBox.querySelectorAll(".team-line");
  const scores = matchBox.querySelectorAll(".ko-score");
  const penalties = matchBox.querySelectorAll(".ko-penalty");

  if (teams.length < 2 || scores.length < 2) return null;

  const teamA = teams[0].textContent.trim();
  const teamB = teams[1].textContent.trim();
  const scoreA = parseInt(scores[0].value);
  const scoreB = parseInt(scores[1].value);

  if (isNaN(scoreA) || isNaN(scoreB)) return null;

  if (scoreA > scoreB) return teamB;
  if (scoreB > scoreA) return teamA;

  if (penalties.length < 2) return null;
  const penA = parseInt(penalties[0].value);
  const penB = parseInt(penalties[1].value);

  if (isNaN(penA) || isNaN(penB)) return null;
  if (penA > penB) return teamB;
  if (penB > penA) return teamA;

  return null;
}
// =====================================================
// PROPAGA OS CLASSIFICADOS
//
// Atualiza automaticamente:
//
// W74 → próxima fase
// W89 → próxima fase
// W97 → semifinal
//
// Também destaca visualmente
// os vencedores das partidas.
// =====================================================
function updateKnockoutWinners() {
  document.querySelectorAll(".match-box[data-match]").forEach((match) => {
    const matchId = match.dataset.match;
    const winner = getMatchWinner(match);
    const runnerUp = getMatchRunnerUp(match);
    // Remove destaque anterior
    match.querySelectorAll(".team-line").forEach((team) => {
      team.classList.remove("winner-team");
    });

    // Destaca o vencedor
    if (winner) {
      const teams = match.querySelectorAll(".team-line");

      if (teams[0].textContent.trim() === winner) {
        teams[0].classList.add("winner-team");
      }

      if (teams[1].textContent.trim() === winner) {
        teams[1].classList.add("winner-team");
      }
    }
    if (winner) {
      document
        .querySelectorAll(`.team-line[data-slot="W${matchId}"]`)
        .forEach((slot) => {
          slot.textContent = winner;
        });
    }
    if (runnerUp) {
      document
        .querySelectorAll(`.team-line[data-slot="RU${matchId}"]`)
        .forEach((slot) => {
          slot.textContent = runnerUp;
        });
    }
  });
  updateChampion();
}
// =====================================================
// EXIBE O CAMPEÃO DO MUNDO
//
// Após o resultado da final:
//
// - Mostra bandeira
// - Mostra nome
// - Exibe painel do campeão
// =====================================================
function updateChampion() {
  const finalMatch = document.querySelector('.match-box[data-match="104"]');
  if (!finalMatch) return;

  const champion = getMatchWinner(finalMatch);
  const championDisplay = document.getElementById("champion-display");
  if (!championDisplay) return;

  if (!champion) {
    championDisplay.classList.add("hidden");
    return;
  }

  championDisplay.classList.remove("hidden");
  const championNameEl = document.getElementById("champion-name");
  if (championNameEl) championNameEl.textContent = champion;

  const teamData = groups
    .flatMap((group) => group.teams)
    .find((team) => team.name === champion);
  const championFlagEl = document.getElementById("champion-flag");
  if (teamData && championFlagEl) {
    championFlagEl.src = teamData.flag;
  }
}

window.addEventListener("load", () => {
  if (window.innerWidth <= 768) {
    const bracketContainer = document.querySelector(".bracket-container");

    if (bracketContainer) {
      bracketContainer.scrollLeft = 0;
    }
  }
});

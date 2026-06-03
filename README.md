# 🏆 Copa do Mundo 2026

Sistema web completo para simulação e gerenciamento dos resultados dos jogos da Copa do Mundo 2026.

O projeto permite registrar resultados da fase de grupos, calcular automaticamente as classificações, definir os melhores terceiros colocados, gerar o chaveamento das fases eliminatórias e acompanhar toda a competição até a definição do campeão.

Desenvolvido como projeto de estudo Full Stack utilizando JavaScript, Node.js e Express.

---

# 🚀 Funcionalidades

## Fase de Grupos

* Cadastro dos resultados das partidas
* Atualização automática da classificação
* Cálculo de:

  * Pontos
  * Vitórias
  * Empates
  * Derrotas
  * Gols Pró
  * Gols Contra
  * Saldo de Gols
* Aplicação automática dos critérios de desempate
* Destaque visual para os classificados

## Melhores Terceiros Colocados

* Identificação automática dos 8 melhores terceiros
* Classificação baseada em:

  * Pontos
  * Saldo de gols
  * Gols marcados
* Destaque visual dos classificados
* Ajuste manual disponível para administradores

## Mata-Mata Completo

* Segunda fase (32 seleções)
* Oitavas de final
* Quartas de final
* Semifinais
* Disputa de 3º lugar
* Final

## Sistema de Avanço Automático

* Propagação automática dos vencedores para a próxima fase
* Atualização automática das chaves
* Destaque visual dos vencedores

## Disputa por Pênaltis

* Exibição automática dos campos de penalidades em caso de empate
* Definição automática do vencedor após os pênaltis

## Campeão

* Identificação automática do campeão
* Exibição da bandeira da seleção campeã
* Destaque visual na página principal

## Área Administrativa

* Login protegido por usuário e senha
* Controle de sessão utilizando Express Session
* Restrição de edição para usuários não autenticados
* Botões administrativos para gerenciamento do torneio

## Persistência de Dados

Os dados são armazenados em arquivos JSON:

* `scores.json`
* `thirds-data.json`
* `knockout-data.json`
* `tournament-state.json`

---

# 🛠 Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

## Backend

* Node.js
* Express.js
* Express Session
* CORS

## Armazenamento

* Arquivos JSON

---

# 📂 Estrutura do Projeto

```text
copa-2026/
│
├── data/
│   └── groups.js
│
├── img/
│   └── cup2026-transp.png
│
├── index.html
├── admin.html
│
├── style.css
├── admin.css
│
├── backend/
│   └── server.js
│   └── scores.json
│   └── thirds-data.json
│   └── knockout-data.json
│   └── tournament-state.json
│   └── .env
│   └── package.json
│   └── package-lock.json
├── script.js
├── admin.js 
│
└── README.md
```

---

# ⚙️ Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/caires-tech/copa-2026.git
```

## 2. Acesse a pasta do projeto

```bash
cd copa-2026
```

## 3. Instale as dependências

```bash
npm install
```

## 4. Crie o arquivo .env

```env
ADMIN_USER=admin
ADMIN_PASSWORD=sua_senha
```

## 5. Inicie o servidor

```bash
node server.js
```

Servidor backend:

```text
http://localhost:3000
```

## 6. Execute o Frontend

Abra o projeto utilizando a extensão Live Server do VS Code.

---

# 🔒 Segurança

O sistema utiliza:

* Sessões via Express Session
* Middleware de autenticação
* Controle de acesso administrativo
* Proteção de rotas sensíveis
* Restrição de edição para visitantes

---

# 🎯 Objetivo do Projeto

Este projeto foi criado como prática de desenvolvimento Full Stack, envolvendo conceitos como:

* Manipulação de DOM
* JavaScript avançado
* Regras de negócio complexas
* Estruturas de dados
* Backend com Node.js
* Autenticação e sessões
* Persistência de dados
* Organização e documentação de código

Além do aprendizado técnico, o objetivo foi desenvolver uma aplicação completa simulando um torneio esportivo real, desde a fase de grupos até a final.

---

# 👨‍💻 Autor

Rodrigo Caires

Desenvolvedor Web Júnior em formação, com experiência profissional nas áreas administrativa e financeira e atualmente focado em desenvolvimento Full Stack e Inteligência Artificial.

GitHub:
https://github.com/caires-tech

LinkedIn:
https://www.linkedin.com/in/rodrigo-caires

---

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório. Sugestões são sempre bem-vindas.

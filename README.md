# Bridgekeeper — Lab de Gestão de Segurança da Informação

Ambiente de aula prática composto por uma API Node.js/TypeScript atrás de um proxy NGINX, orquestrado com Docker. Dois times trabalham em paralelo em branches separadas.

---

## Estrutura do Repositório

```
bridgekeeper/
├── api/                    # API Node.js/TypeScript
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/orders.ts
│   │   └── data/seed.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── proxy/                  # Proxy reverso (NGINX)
│   ├── nginx.conf
│   └── Dockerfile
├── logs/                   # Volume compartilhado — logs do NGINX
├── redteam/
│   ├── README.md           # Guia de atividades do Red Team
│   └── evidence/
├── blueteam/
│   ├── README.md           # Guia de atividades do Blue Team
│   └── evidence/
├── docs/
│   └── observability.md    # Formato dos logs (referência compartilhada)
└── docker-compose.yml
```

---

## Subir o Ambiente

```bash
# Pré-requisitos: Docker + Docker Compose

git clone <url-do-repo>
cd bridgekeeper
docker compose up --build
```

A API fica acessível em `http://localhost:8080`.

---

## Como Trabalhar Neste Repositório

**1. Faça um fork** do repositório pelo GitHub (botão "Fork" no canto superior direito).

**2. Clone o seu fork:**
```bash
git clone https://github.com/<seu-usuario>/bridgekeeper.git
cd bridgekeeper
```

**3. Acesse a branch do seu time** (ela já existe no repositório):
```bash
# Red Team
git checkout redteam/hardening

# Blue Team
git checkout blueteam/monitoring
```

**4. Suba o ambiente:**
```bash
docker compose up --build
```

**5. Salve suas evidências** na pasta do time (`redteam/evidence/` ou `blueteam/evidence/`) e commite:
```bash
git add redteam/evidence/
git commit -m "feat: adiciona script de exploração"
git push origin redteam/hardening
```

**6.** Ao final, abra um **Pull Request** do seu fork para o repositório original, na branch do seu time.

---

## Times e Branches

| Time | Branch | Guia |
|---|---|---|
| Red Team | `redteam/hardening` | [redteam/README.md](redteam/README.md) |
| Blue Team | `blueteam/monitoring` | [blueteam/README.md](blueteam/README.md) |

```bash
# Red Team
git checkout -b redteam/hardening

# Blue Team
git checkout -b blueteam/monitoring
```

---

## Regras do Lab

- A branch `master` é o ponto de partida — não altere o código nela.
- Cada time trabalha exclusivamente na sua branch.
- Evidências (scripts, relatórios, prints) devem ser salvas na pasta do time e commitadas na sua branch:
  - Red Team → `redteam/evidence/`
  - Blue Team → `blueteam/evidence/`
- Os logs em `./logs/` não são versionados — são gerados em tempo de execução.

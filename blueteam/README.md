# Blue Team — Gestão, Monitoramento e Compliance

**Branch:** `blueteam/monitoring`

---

## Objetivo

Dar visibilidade ao ataque em andamento e estruturar a resposta organizacional — técnica e legal.

---

## Fase 1 — Monitoramento (Detecção)

O NGINX gera um log de acesso em formato JSON em `./logs/access.log`. Cada linha contém IP de origem, rota acessada, status HTTP, user-agent e timestamp. Este arquivo é o único canal de informação do Blue Team — sem acesso direto aos containers ou à API.

**Sua missão:** ler e analisar esse log para detectar o ataque do Red Team. Identifique:

- Quais IPs fizeram o maior número de requisições à rota `/orders/`
- Quantos IDs de pedido distintos cada IP acessou
- A distribuição de status HTTP (200, 404, 429) ao longo do tempo
- O momento exato em que o ataque começou e terminou

**Ferramentas sugeridas:** GoAccess (dashboard visual), Python com `pandas` ou `json`, shell com `jq`.

**Entregáveis:**
- Dashboard HTML (GoAccess) ou relatório em texto/planilha em `blueteam/evidence/`
- PRI preenchido (ver template abaixo)

**Pergunta-guia:** quanto tempo levou entre o início do ataque e o momento em que o log mostrou claramente o padrão anômalo? Esse é o seu *tempo de detecção*.

---

## Fase 2 — Gestão e Compliance (Resposta)

O Red Team vazou dados de pedidos de múltiplos usuários. Agora a empresa precisa responder — operacionalmente e legalmente.

**Sua missão:** preencher o Plano de Resposta a Incidentes (PRI) abaixo com base no incidente simulado pelo Red Team.

**Ferramentas sugeridas:** Excel ou Google Sheets (cálculo de risco), frameworks NIST CSF ou ISO 27001 como referência de estrutura.

---

## Desafio Extra

Compare o log antes e depois de o Red Team ativar o rate limiting. O número de pedidos vazados caiu? O ataque teria sido detectável mais rápido com alertas automáticos? Proponha um critério de alerta no PRI.

---

## Template — Plano de Resposta a Incidentes (PRI)

Salve como `blueteam/evidence/pri.md`.

```
PLANO DE RESPOSTA A INCIDENTES
================================

Time        : Blue Team
Nº Incidente: INC-2024-001
Classificação: [ ] Crítico  [ ] Alto  [ ] Médio  [ ] Baixo
Data/Hora   : ____-__-__ __:__
Integrantes : ___________________________

1. DESCRIÇÃO DO INCIDENTE
   ─────────────────────
   Rota afetada : 
   IP(s) de origem:
   Período      : __:__ até __:__
   Total de requisições detectadas:

2. LINHA DO TEMPO
   ─────────────
   [__:__] Primeiros acessos anômalos no log
   [__:__] Pico de requisições (___/min)
   [__:__] Padrão identificado pela equipe
   [__:__] Contenção aplicada

   Tempo de detecção: ___ minutos

3. IMPACTO
   ───────
   Pedidos expostos        : 
   Usuários afetados       : 
   Dados pessoais expostos : [ ] Sim  [ ] Não
   Categorias (se sim)     : [ ] Nome  [ ] Endereço  [ ] Dados financeiros  [ ] Outro: ___

4. CONTENÇÃO
   ──────────
   Ação imediata tomada:
   [ ] Bloqueio de IP
   [ ] Rate limiting ativado
   [ ] Rota desabilitada
   [ ] Equipe notificada
   Descrição: 

5. IMPACTO FINANCEIRO (LGPD — Art. 52)
   ─────────────────────────────────────
   Faturamento anual da empresa (estimado): R$
   Multa máxima (2% do faturamento, limite R$ 50M): R$
   Estimativa de custo por titular afetado: R$
   Custo total estimado do incidente: R$

6. OBRIGAÇÕES LEGAIS
   ──────────────────
   Houve dado pessoal exposto? [ ] Sim  [ ] Não

   Se SIM:
   [ ] Comunicar à ANPD em até 72h
   [ ] Notificar titulares afetados
   [ ] Registrar no Relatório de Impacto (RIPD)

7. LIÇÕES APRENDIDAS
   ──────────────────
   O que a API deveria ter para impedir esse ataque?

   (Extra) Critério de alerta automático proposto:
   "Disparar alerta quando ___________________________"
```

---

## Conceitos para a Apresentação

A apresentação do time deve explicar, no mínimo, os seguintes conceitos:

- **OWASP API Top 10** — o que é e como usar a lista para classificar e comunicar o risco de um incidente em um contexto organizacional
- **BOLA (Broken Object Level Authorization)** — o impacto organizacional da vulnerabilidade: quais dados foram expostos, quem é afetado e o que isso representa para a empresa
- **Log estruturado e observabilidade** — o que é um log estruturado (JSON), por que ele facilita a detecção de ataques e o que é o conceito de observabilidade
- **MTTD (Mean Time to Detect)** — o que é o tempo médio de detecção e por que ele é uma métrica crítica de segurança
- **LGPD** — as obrigações legais em caso de vazamento: prazo de comunicação à ANPD, notificação de titulares e cálculo de multa (Art. 52)
- **Frameworks de Governança** — o que são NIST CSF e ISO 27001 e como eles estruturam a resposta a incidentes

---

## Checklist de Entrega

- [ ] Dashboard ou relatório de análise do `access.log` em `blueteam/evidence/`
- [ ] IP do atacante identificado com evidência nos logs
- [ ] Tempo de detecção calculado e documentado no PRI
- [ ] PRI completo em `blueteam/evidence/`
- [ ] Cálculo de impacto financeiro baseado na LGPD
- [ ] (Extra) Critério de alerta automático proposto

---

**Techs:** GoAccess, Python/Pandas, Excel ou Google Sheets, NIST CSF, ISO 27001, LGPD.

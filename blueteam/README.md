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
- Quantos IDs de pedido distintos cada IP acessou (indicador de enumeração)
- A distribuição de status HTTP (200, 404, 429) ao longo do tempo
- O momento exato em que o ataque começou e terminou

**Ferramentas sugeridas:** GoAccess (dashboard visual), Python com `pandas` ou `json`, shell com `jq`. O relatório ou dashboard deve ser salvo em `blueteam/evidence/`.

**Entregável:** dashboard HTML (GoAccess) ou relatório em texto/planilha com as métricas acima e a identificação do IP atacante.

**Pergunta-guia:** quanto tempo levou entre o início do ataque e o momento em que o log mostrou claramente o padrão anômalo? Esse é o seu *tempo de detecção*.

---

## Fase 2 — Gestão e Compliance (Resposta)

O Red Team vazou dados de pedidos de múltiplos usuários. Agora a empresa precisa responder — operacionalmente e legalmente.

**Sua missão:** elaborar um Plano de Resposta a Incidentes (PRI) cobrindo:

1. **Contenção imediata** — quais ações técnicas a empresa tomaria nas primeiras horas? (bloqueio de IP, desativação de rota, acionamento de equipes)
2. **Comunicação** — como e quando notificar os usuários afetados? Quem decide?
3. **Impacto financeiro** — com base na LGPD (Lei 13.709/2018, Art. 52), qual a multa máxima aplicável? Calcule o risco financeiro considerando o número de titulares expostos.
4. **Obrigações legais** — houve dado pessoal exposto? O incidente precisa ser reportado à ANPD? Em qual prazo?
5. **Lições aprendidas** — o que deveria existir na API para que esse ataque fosse impossível, e não apenas mitigado?

**Ferramentas sugeridas:** Excel ou Google Sheets (cálculo de risco e matriz de impacto), frameworks NIST CSF ou ISO 27001 como referência de estrutura.

**Entregável:** documento do PRI preenchido para o incidente simulado, incluindo a análise de impacto financeiro e as obrigações LGPD.

---

## Desafio Extra

Compare o log *antes* e *depois* de o Red Team ativar o rate limiting. O número de pedidos vazados caiu? O ataque teria sido detectável mais rápido com alertas automáticos? Proponha um critério de alerta (ex: "mais de X requisições a `/orders/` por IP em menos de Y segundos").

---

## Checklist de Entrega

- [ ] Dashboard ou relatório de análise do `access.log` em `blueteam/evidence/`
- [ ] IP do atacante identificado com evidência nos logs
- [ ] Tempo de detecção calculado e documentado
- [ ] PRI completo com contenção, comunicação e análise de impacto
- [ ] Cálculo de risco financeiro baseado na LGPD
- [ ] Resposta à pergunta: *com rate limiting ativo, o ataque ainda causaria obrigação de notificação à ANPD?*
- [ ] (Extra) Proposta de critério de alerta automático

---

**Techs:** GoAccess, Python/Pandas, Excel ou Google Sheets, NIST CSF, ISO 27001, LGPD.

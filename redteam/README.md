# Red Team — Exploração e Hardening

**Branch:** `redteam/hardening`

---

## Objetivo

Demonstrar na prática o impacto de uma falha de autorização e, em seguida, implementar a primeira linha de defesa no proxy.

---

## Fase 1 — Exploração (Offensive)

A API expõe um endpoint que retorna pedidos pelo ID. Os IDs são sequenciais e não há verificação de propriedade — qualquer usuário pode acessar o pedido de qualquer outro.

**Sua missão:** escrever um script que enumere automaticamente os IDs da rota `/orders/:id`, colete os dados de todos os pedidos encontrados e salve o resultado como evidência.

O script deve identificar quais pedidos pertencem ao usuário autenticado e quais foram acessados indevidamente.

**Ferramentas sugeridas:** Python (`requests`), Postman (Runner com iteração de IDs), curl.

**Entregável:** arquivo de evidência (JSON ou CSV) com todos os pedidos coletados, indicando o `userId` real de cada um.

---

## Fase 2 — Hardening (Defensive)

Com o ataque documentado, implemente rate limiting no NGINX para barrar automações de alta velocidade.

**Sua missão:** configurar o módulo `limit_req_zone` no arquivo `proxy/nginx.conf` para limitar o número de requisições por IP na rota `/orders/`. A configuração deve ser ativada nesta branch — ela está comentada no `main` intencionalmente.

Após ativar, re-execute o script da Fase 1 e confirme que as respostas HTTP 429 aparecem nos logs.

**Entregável:** `proxy/nginx.conf` funcional com o rate limiting ativo e um breve relatório comparando o comportamento antes e depois (quantidade de respostas 200 vs. 429).

---

## Desafio Extra

Após implementar o rate limiting, tente contorná-lo usando cabeçalhos `User-Agent` rotativos ou IPs distintos. O bloqueio por IP é suficiente para impedir o ataque? Documente a conclusão.

---

## Checklist de Entrega

- [ ] Script de exploração executado e evidência salva
- [ ] Print do `logs/access.log` durante o ataque (antes do hardening)
- [ ] `proxy/nginx.conf` com rate limiting ativo e comentado
- [ ] Confirmação de respostas HTTP 429 nos logs
- [ ] Resposta à pergunta: *o rate limiting resolve a vulnerabilidade BOLA ou apenas a mitiga?*
- [ ] (Extra) Documentação da tentativa de bypass

---

**Techs:** NGINX, Python, Postman.

RELATÓRIO DE ATAQUE
===================

Time        : Red Team
Data/Hora   : 2026-05-20 13:45
Integrantes : PAULO HENRIQUE RODRIGUES MARIZ ANTONIO VITOR FERNANDES DIOGENES JOSEFA RENÂNGELA MARTINS DUNGAS JOÃO GUILHERME NOGUEIRA SILVA VICTOR CAVALCANTE SALVINO JOSÉ ALEX MARTINS DA SILVA

1. DESCRIÇÃO DO ATAQUE
   ───────────────────
   Rota explorada  : /orders/:id
   Método utilizado: BOLA (Broken Object Level Authorization) / IDOR (Insecure Direct Object Reference)
   Ferramenta      : Script automatizado em Python utilizando a biblioteca `requests`

2. EXECUÇÃO
   ────────
   Total de requisições enviadas : 50
   Período de execução           : 13:45 até 13:46
   IDs acessados                 : de 1 até 50
   Pedidos de outros usuários encontrados: 49 (considerando que apenas 1 ID pertencia ao usuário autenticado)

3. RESULTADOS — ANTES DO HARDENING
   ─────────────────────────────────
   Respostas HTTP 200 : 50
   Respostas HTTP 404 : 0
   Dados coletados    : [X] JSON  [ ] CSV  [ ] Outro: ___

4. HARDENING IMPLEMENTADO
   ───────────────────────
   Configuração aplicada (resumo):
   Ativação do módulo de controle de tráfego do NGINX atuando como API Gateway / Proxy Reverso à frente da aplicação. Foi definida uma zona de memória compartilhada para rastrear as requisições por IP de origem.

   Rate definido  : 5r/s (máximo de 5 requisições por segundo por IP)
   Burst definido : 5 nodelay (tolerância para pequenos picos de acessos simultâneos sem atrasar a resposta)

5. RESULTADOS — APÓS O HARDENING
   ────────────────────────────────
   Respostas HTTP 200 : 10 (As primeiras requisições permitidas pelo limite + margem do burst)
   Respostas HTTP 429 : 40 (Requisições subsequentes bloqueadas por excesso de velocidade)
   O ataque foi mitigado? [ ] Sim  [X] Parcialmente  [ ] Não

6. CONCLUSÃO
   ──────────
   O rate limiting resolve a vulnerabilidade ou apenas a mitiga?
   Apenas mitiga. O rate limiting atua na camada de infraestrutura (NGINX), impedindo que ferramentas automatizadas realizem a raspagem massiva de dados em alta velocidade ou causem a negação de serviço (DoS) da API. No entanto, a falha estrutural de BOLA continua existindo no código-fonte do backend. Um atacante paciente ainda conseguiria extrair todos os dados de forma manual ou espaçada (ex: 1 requisição a cada 3 segundos). Para resolver definitivamente, a aplicação precisa validar no banco de dados se o usuário logado realmente possui direito de propriedade sobre o ID do pedido solicitado.

   (Extra) Foi possível contornar o rate limiting? Como?
   Sim, é perfeitamente possível através de técnicas de evasão baseadas em IP distribuído (ex: uso de redes Tor, VPNs ou proxies rotativos). Como a diretiva do NGINX foi atrelada à variável `$binary_remote_addr` (IP do cliente), alterar o cabeçalho `User-Agent` de forma rotativa não surte efeito, pois o IP de origem continua o mesmo. Controles estritamente baseados em IP de origem possuem limitações claras contra ataques distribuídos (Botnets), reforçando que a segurança deve ser feita em camadas.

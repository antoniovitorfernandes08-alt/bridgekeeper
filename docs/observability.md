# Observabilidade — Interface entre Times

O NGINX gera um log de acesso em `./logs/access.log`. Cada linha é um objeto JSON com os seguintes campos:

| Campo | Descrição |
|---|---|
| `time` | Timestamp ISO 8601 |
| `remote_addr` | IP de origem da requisição |
| `method` | Método HTTP |
| `uri` | Rota acessada |
| `status` | Código de resposta HTTP |
| `body_bytes_sent` | Tamanho da resposta em bytes |
| `request_time` | Tempo de processamento (segundos) |
| `http_user_agent` | Client que fez a requisição |
| `http_x_user_id` | Header de identificação do usuário |

O arquivo é gerado pelo container `nginx` e fica disponível diretamente na máquina host — nenhum acesso ao container é necessário. Erros do proxy ficam em `./logs/error.log`.

Salve scripts e relatórios de análise em `blueteam/evidence/`.

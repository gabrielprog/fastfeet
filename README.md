# SOBRE APLIACAÇÃO
---

🚀 Tecnologias
---
Esse projeto foi desenvolvido com as seguintes tecnologias:
1. Node.js
1. Redis
1. MongoDB
1. Postgres

💻 Projeto
---
O fastfeet é um sistema de entrega de encomenda, um mini-simulador de uma transportadora

📝 ***Documentação***
---
## ADMIN DELIVERYMAN

`GET /admin/deliverymans`

***para acessa esse recurso você precisa do tokken***

Retorna todos os estragadores da aplicação

`POST /admin/deliverymans`

***para acessa esse recurso você precisa do tokken***

Criar um novo entregador
```
{
	"name": "Example",
	"email": "example@org.br",
	"avatar_id": 2
}
```

`POST /admin/deliverymans/upload`

***para acessa esse recurso você precisa do tokken***

Armazena o avatar do entregador

```
{
	file: multipart
}
```


`PUT /admin/deliverymans`

***para acessa esse recurso você precisa do tokken***

ATUALIZA O NOME DO ENTREGADOR

{
	"id": 1,
	"name": "Example"
}

`DELETE /admin/deliverymans/:ID`

***para acessa esse recurso você precisa do tokken***

Deleta um entregador

## PEGAR SESSION PARA ADMIN DELIVERYMAN

`POST /session`

```
{
	"email": "example@org.br",
	"password": "12345678"
}
```

## REGISTRAR ENTREGAR 

`POST /admin/order`

***para acessa esse recurso você precisa do tokken***
 
```
{
	"recipient_id": 0,
	"deliveryman_id": 0,
	"product": "acer helio 300"
}
```

Registrar uma nova entregar

`GET /admin/order`

***para acessa esse recurso você precisa do tokken***

Traz todas as encomendas criadas


`PUT /admin/order`

***para acessa esse recurso você precisa do tokken***

```
{
	"id": 0,
	"recipient_id": 0,
	"deliveryman_id": 0
}
```

Atualizar os dados da entregar 

`DELETE /admin/order/:id`

***para acessa esse recurso você precisa do tokken***

Deleta uma entregar

## OPERAÇÃO PARA OS ENTREGADORES EXECUTA

`GET /deliveryman/:id/deliveries`

Traz todas as entregas do dia para o entregador

`POST /deliveryman/:id/deliveries`

{
	"id": 2(<= ID DA ENTREGA(order)),
	"start_date": "2020-09-18T18:06:01-03:00"
}

começa uma entrega

`POST /deliveryman/:id_order/endorder/:id_deliveryman`
```
{
 file: Multipart
}
```

Finaliza um entrega e envia a foto da assinatura para o servidor

## RELATAR UM PROBLEMA

`GET /problems`

***para acessa esse recurso você precisa do tokken***

retornar todos os problemas

`GET /problem/:id`


***para acessa esse recurso você precisa do tokken***

retornar os problemas relacionado a um determinado problema

`DELETE /problem/:id`


***para acessa esse recurso você precisa do tokken***

Deleta um determinado problema pelo id

`POST /problem/:id`


***para acessa esse recurso você precisa do tokken***

```
{
	"description": "Exemplo"
}
```

Criar um problema relacionado a determinado entregador


## CRIAR UM ENDEREÇO DE ENTREGAR

`POST /registered/updated`

***para acessa esse recurso você precisa do tokken***

```
{
	"name": "example santos",
	"street": "Rua example",
	"number": "000",
	"complement": "EX 233",
	"state": "example",
	"city": "example",
	"postal_code": "00000-000"
}
```

📝 Licença
---
Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

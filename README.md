[DOCKER_BADGE]: https://img.shields.io/badge/Docker-384d54?style=for-the-badge&logo=Docker
[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[WAKATIME_BADGE]: https://wakatime.com/badge/github/gabriellgjs/aponta-api.svg?style=for-the-badge
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[NODE__BADGE]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[POSTGRESQL__BADGE]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[LICENSE__BADGE]: https://img.shields.io/github/license/gabriellgjs/aponta-api.svg?style=for-the-badge

<h1 align="center" style="font-weight: bold;">APONTA 🦷 API</h1>

<div align="center">

![node][NODE__BADGE]
![typescript][TYPESCRIPT__BADGE]
![express][EXPRESS__BADGE]
![postgresql][POSTGRESQL__BADGE]
![docker][DOCKER_BADGE]
![wakatime][WAKATIME_BADGE]
![license][LICENSE__BADGE]

</div>

<div align="center">
  <a href="#pre-requisites">Requisitos</a> •
  <a href="#how-to-use">Instalando o projeto</a> •
  <a href="#usage">Uso</a> •
  <a href="#endpoints">Endpoints</a> 
</div>

</br>

Essa aplicação foi desenvolvida  utilizando **Node e TypeScript** para criação de uma API para realizar meu agendamentos.</br> O intuito do projeto é fornecer uma __aplicação gratuita__ de um backend para ser consumida por __qualquer frontend__.</br>Seu principal objetivo é ser melhor, mais rápida e segura do que uma agenda física.
<h2 id="pre-requisites">💻 Requisitos</h2>

Para rodar esse projeto você precisa ter o **Docker** e **acesso à internet** na sua máquina.

<h2 id="how-to-use"> 🚀 Instalando o projeto</h2>

> Primeiro você deve clonar o repositório:

```bash
$ git clone https://github.com/gabriellgjs/aponta-api
```

> Depois entrar na pasta do projeto:

```bash
$ cd aponta-api
```
> Gerar arquivo .env na raiz:
```bash
$ cp .env_example .env
```

> Gerar o .env da .docker:
```bash
$ cd .docker && cp .env_example .env && cd ..
```

> Buildar e dar start no ambiente docker:
```bash
$ docker-compose -f .docker/docker-compose.yml --env-file .docker/.env up -d --build
```

> Se preferir pode usar comando de Makefile:
```bash
$ make start
```

> Com os containers rodando, faça as migrations e seed:
```bash
$ make prepare-db
```

> Instale as depêndencias da aplicação:
```bash
$ make api-install
```

> Inicie o servidor:
```bash
$ make api-start
```

> Se quiser usar o Prisma Studio para acompanhar o banco de dados:
```bash
$ make prisma-studio
```

<h2 id="usage">🪥 Uso </h2>
A aplicação estará disponível na: <a href="http://localhost:3000/v1/ ">http://localhost:3000/v1/</a> 

<h2 id="endpoints">🗺 Endpoints </h2>
Os endpoints estará disponível no Swagger na: <a href="http://localhost:3000/v1/api-docs/ ">http://localhost:3000/v1/api-docs/</a> 

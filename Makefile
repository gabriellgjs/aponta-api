DOCKER_COMPOSE_FILE=.docker/docker-compose.yml
DOCKER_ENV_FILE=.docker/.env

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Infra commands                                                              │
# └─────────────────────────────────────────────────────────────────────────────┘

.PHONY: prepare-api
prepare-api: stop start api-dev

.PHONY: prepare-db
prepare-db: db-seed prisma-studio

.PHONY: build
build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) build

.PHONY: start
start:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) up -d

.PHONY: stop
stop:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) down

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ API commands                                                                │
# └─────────────────────────────────────────────────────────────────────────────┘

.PHONY: api-build
api-build:
	@docker exec aponta-api bash -c "yarn run build"

.PHONY: api-dev
api-dev: start
	@docker exec -it aponta-api bash -c "sudo yarn run dev"

.PHONY: api-exec
api-exec:
	@docker exec -it aponta-api bash

.PHONY: api-install
api-install:
	@docker exec -it aponta-api bash -c "sudo yarn"

.PHONY: api-log
api-log:
	@docker logs aponta-api --follow

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ DATABASE commands                                                           │
# └─────────────────────────────────────────────────────────────────────────────┘

.PHONY: db-seed
db-seed: db-migrate
	@docker exec -it aponta-api bash -c "sudo npx prisma db seed"

.PHONY: db-migrate
db-migrate:
	@docker exec -it aponta-api bash -c "sudo npx prisma migrate dev"

.PHONY: prisma-studio
prisma-studio:
	@docker exec -it aponta-api bash -c "sudo npx prisma studio --browser none"
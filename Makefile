
docker-compose up: 
	docker-compose up -d --build

migrate: docker-compose up
	docker exec -it odonts-api npx prisma migrate dev 

seed: migrate
	docker exec -it odonts-api npx prisma db seed

start: seed
	@echo -e "${CG}Start API"

prisma-studio: 
	docker exec -it odonts-api npx prisma studio
docker-compose up: 
	docker-compose up -d --build

migrate: 
	docker exec -it odonts-api npx prisma migrate dev
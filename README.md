# 3-Tier Employee Management CI/CD

## Architecture
Frontend (Nginx) -> Backend (Spring Boot REST) -> PostgreSQL database.

## Run locally on EC2
```bash
docker compose up -d --build
docker compose ps
curl http://localhost/api/employees
```
Open `http://EC2-PUBLIC-IP/` for the frontend.

## API
GET `/api/employees` via frontend proxy
POST `/api/employees`
GET `/api/employees/{id}`
PUT `/api/employees/{id}`
DELETE `/api/employees/{id}`

## Jenkins
Pipeline checks out the repo, runs Maven tests, rebuilds the three services with Docker Compose, then verifies frontend/API availability.

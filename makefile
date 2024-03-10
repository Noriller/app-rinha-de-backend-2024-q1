up:
	docker compose -f rinhaDeploy/docker-compose.yml up

upb:
	docker compose -f rinhaDeploy/docker-compose.yml up --build --force-recreate

upd:
	docker compose -f rinhaDeploy/docker-compose.yml up -d

gatling:
	docker compose -f loadTest/compose.yml up

gatClean:
	sudo rm -rf loadTest/load-test/results/*

gatResult:
	sh ./loadTest/gatling-text-report.sh

buildImage:
	docker build -t app-rinha-de-backend-2024-q1 .

tagImage: TAG ?= latest
tagImage:
	@echo Tagging image with version: $(TAG)
	docker tag app-rinha-de-backend-2024-q1 brunonoriller/app-rinha-de-backend-2024-q1:$(TAG)

pushImage:
	docker push brunonoriller/app-rinha-de-backend-2024-q1

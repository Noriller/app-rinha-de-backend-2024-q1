up:
	docker compose -f rinhaDeploy/docker-compose.yml up

up3:
	docker compose -f rinhaDeploy/docker-compose.3.yml up

up4:
	docker compose -f rinhaDeploy/docker-compose.4.yml up

up5:
	docker compose -f rinhaDeploy/docker-compose.5.yml up

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
	docker push brunonoriller/app-rinha-de-backend-2024-q1 --all-tags

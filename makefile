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

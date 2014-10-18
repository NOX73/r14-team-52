serve:
	docker exec -t -i points grunt serve
build:
	docker exec -t -i points grunt build
rails:
	docker exec -t -i points_ruby rails s

docker_create: docker_create_points docker_create_ruby
docker_create_points:
	docker create -i -v $(shell pwd):/tmp/points -p 8000:8000 -w /tmp/points --name points dockerfile/nodejs /bin/bash -l
docker_create_ruby:
	docker create -i -v $(shell pwd):/tmp/points -p 3000:3000 --link points_db:db -w /tmp/points --name points_ruby binaryphile/ruby:2.1.2 /bin/bash -l
docker_create_postgres:
	docker create -i -p 5432:5432 --name points_db orchardup/postgresql

docker_start: docker_start_points docker_start_db docker_start_ruby
docker_start_points:
	docker start points
docker_start_ruby:
	docker start points_ruby
docker_start_db:
	docker start points_db

docker_points:
	docker exec -t -i points /bin/bash -l
docker_ruby:
	docker exec -t -i points_ruby /bin/bash -l
docker_db:
	docker exec -t -i points_db /bin/bash -l


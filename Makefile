serve: 
	docker exec -t -i points grunt serve

docker_new:
	docker run -i -t -v $(shell pwd):/tmp/points -p 8000:8000 -w /tmp/points --name points dockerfile/nodejs /bin/bash -l

docker:
	docker start points && docker attach points


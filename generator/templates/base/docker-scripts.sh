docker build . -t my-app

docker run -d -p 8080:8080 -it -v /Users/pumelotea/test:/test my-app

docker exec -it 6717dc943b7a7f9c6d1aa694f08f2eb990aec2e4aab33769c0209a717f83a48b /bin/bash

docker save > my-app.img my-app:latest

docker load < my-app.img

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

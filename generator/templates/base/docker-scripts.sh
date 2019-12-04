docker build . -t my-app

#不带权限
docker run -d -p 8080:8080 -it -v /Users/pumelotea/test:/test my-app
#带权限
docker run -d -p 5555:8080 --privileged=true -it -v /var/docker_logs:/test docker.ltit.info:5000/my-app:v1

docker exec -it 6717dc943b7a7f9c6d1aa694f08f2eb990aec2e4aab33769c0209a717f83a48b /bin/bash

docker save > my-app.img my-app:latest

docker load < my-app.img

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

docker rm $(sudo docker ps -a -q)

#私有仓库
docker run -d -p 5000:5000 --privileged=true -v /opt/registry:/tmp/registry registry

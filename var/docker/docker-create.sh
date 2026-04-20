#!/usr/bin/env bash

docker kill 07ai || true 
docker rm 07ai || true 
docker create --name 07ai -p 3000:3000 -p 4200:4200 localhost/07ai

#!/bin/bash

set -o xtrace

docker rmi localhost/07ai || true
docker build --target dist -t localhost/07ai -f Dockerfile.dev .
docker build --target devcontainer -t localhost/07ai-devcontainer -f Dockerfile.dev .

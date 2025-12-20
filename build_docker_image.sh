#!/bin/bash

set -e

IMAGE_NAME="kane16/portfolio_client"
VERSION="${1:-1.0.0}"

echo "Building Docker image: ${IMAGE_NAME}:${VERSION}"

docker build -t "${IMAGE_NAME}:${VERSION}" .

echo "Successfully built ${IMAGE_NAME}:${VERSION}"

# Optionally tag as latest
docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:latest"
echo "Tagged as ${IMAGE_NAME}:latest"

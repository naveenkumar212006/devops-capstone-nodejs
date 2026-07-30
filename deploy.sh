#!/bin/bash

IMAGE_NAME="YOUR_DOCKERHUB_USERNAME/devops-capstone-nodejs:latest"
CONTAINER_NAME="node-app"

echo "Pulling latest Docker image..."
docker pull $IMAGE_NAME

echo "Stopping existing container..."
docker stop $CONTAINER_NAME || true

echo "Removing existing container..."
docker rm $CONTAINER_NAME || true

echo "Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 3000:3000 \
  --restart unless-stopped \
  $IMAGE_NAME

echo "Deployment completed successfully!"
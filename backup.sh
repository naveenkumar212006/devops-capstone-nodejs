#!/bin/bash

BACKUP_DIR="/home/ubuntu/backups"
LOG_DIR="/var/lib/docker/containers"

DATE=$(date +"%Y-%m-%d_%H-%M-%S")

mkdir -p $BACKUP_DIR

tar -czf $BACKUP_DIR/docker-logs-$DATE.tar.gz $LOG_DIR

echo "Backup completed at $DATE"
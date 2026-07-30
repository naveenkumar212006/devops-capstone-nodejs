pipeline {

    agent any

    environment {

        IMAGE_NAME = "YOUR_DOCKERHUB_USERNAME/devops-capstone-nodejs"

        CONTAINER_NAME = "node-app"

        APP_SERVER = "YOUR_APPLICATION_EC2_PUBLIC_IP"

    }

    stages {

        stage('Clone Repository') {

            steps {

                checkout scm

            }

        }

        stage('Install Dependencies') {

            steps {

                sh 'npm install'

            }

        }

        stage('Build Docker Image') {

            steps {

                sh 'docker build -t $IMAGE_NAME:latest .'

            }

        }

        stage('Push Docker Image') {

            steps {

                withCredentials([usernamePassword(

                    credentialsId: 'dockerhub',

                    usernameVariable: 'DOCKER_USER',

                    passwordVariable: 'DOCKER_PASS'

                )]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy Application') {

            steps {

                sshagent(['app-server']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$APP_SERVER "

                    docker pull $IMAGE_NAME:latest

                    docker stop $CONTAINER_NAME || true

                    docker rm $CONTAINER_NAME || true

                    docker run -d \
                    --name $CONTAINER_NAME \
                    -p 3000:3000 \
                    $IMAGE_NAME:latest

                    "
                    '''
                }

            }

        }

    }

}
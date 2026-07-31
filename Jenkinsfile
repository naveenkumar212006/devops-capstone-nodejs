pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "naveenkumar21032006/devops-capstone-nodejs"
        APP_SERVER = "13.232.222.98"
        APP_USER = "ubuntu"
        CONTAINER_NAME = "node-app"
    }

    stages {

        stage('Checkout Source') {
            steps {
                git branch: 'main',
                    credentialsId: 'jenkins-capstone',
                    url: 'https://github.com/naveenkumar212006/devops-capstone-nodejs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE}:latest .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh """
                        echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                    """
                }
            }
        }

        stage('Deploy to Application Server') {
            steps {
                sshagent(credentials: ['ec2-server']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_SERVER} '
                            docker pull ${DOCKER_IMAGE}:latest

                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true

                            docker run -d \
                                --name ${CONTAINER_NAME} \
                                --restart unless-stopped \
                                -p 3000:3000 \
                                ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }

        stage('Deployment Verification') {
            steps {
                sh """
                    echo "Waiting for application to start..."
                    sleep 10

                    curl --connect-timeout 5 \
                         --max-time 10 \
                         --retry 5 \
                         --retry-delay 5 \
                         --fail \
                         http://${APP_SERVER}:3000/health
                """
            }
        }
    }

    post {

        success {
            echo "======================================="
            echo "Deployment Successful!"
            echo "Application URL:"
            echo "http://${APP_SERVER}:3000"
            echo "Health Check:"
            echo "http://${APP_SERVER}:3000/health"
            echo "======================================="
        }

        failure {
            echo "======================================="
            echo "Pipeline Failed!"
            echo "Check Jenkins Console Output."
            echo "======================================="
        }

        always {
            cleanWs()
        }
    }
}

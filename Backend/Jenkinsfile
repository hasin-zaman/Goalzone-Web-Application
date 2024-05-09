pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS = credentials('JordanKaneki23')
        IMAGE_TAG = "hasinzmn/goalzone:${BUILD_NUMBER}"
    }

    stage('Build and Push Backend Image') {
            steps {
                script {
                    docker.build("backend-image")
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        docker.image("backend-image").push("${IMAGE_TAG}")
                    }
                }
            }
    }

    stages {
        stage('Build and Push Frontend Image') {
            steps {
                script {
                    docker.build("frontend-image")
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS) {
                        docker.image("frontend-image").push("${IMAGE_TAG}")
                    }
                }
            }
        }
    }
}

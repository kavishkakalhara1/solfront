pipeline {
    agent any

    environment {
        IMAGE_NAME = 'solfront-image'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kavishkakalhara1/solfront.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Use Windows batch syntax
                    bat """
                    echo Building Docker image...
                    docker --version
                    docker build -t %IMAGE_NAME% .
                    """
                }
            }
        }
    }
}

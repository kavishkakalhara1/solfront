pipeline {
    agent any

    environment {
        IMAGE_NAME = 'solfront-image'
    }

    stages {
        stage('Check Docker Installation') {
            steps {
                script {
                    def dockerInstalled = sh(script: 'command -v docker', returnStatus: true)

                    if (dockerInstalled != 0) {
                        echo "Docker is not installed. Installing Docker..."
                        sh '''
                        sudo apt update
                        sudo apt install -y ca-certificates curl gnupg
                        sudo install -m 0755 -d /etc/apt/keyrings
                        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
                        sudo chmod a+r /etc/apt/keyrings/docker.asc
                        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
                        sudo apt update
                        sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
                        sudo usermod -aG docker jenkins
                        '''
                        echo "Docker installed successfully! Restarting Jenkins is required."
                        error("Docker installed. Please restart Jenkins and rerun the pipeline.")
                    } else {
                        echo "Docker is already installed."
                        sh 'docker --version'
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kavishkakalhara1/solfront.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }
    }
}

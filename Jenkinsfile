pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH"  // Ensure required binaries are in the path
    }

    stages {
        stage('Check Docker Installation on Jenkins') {
            steps {
                script {
                    if (sh(script: 'which docker', returnStatus: true) == 0) {
                        echo 'Docker is installed on Jenkins!'
                        sh 'docker --version'
                    } else {
                        error 'Docker is not installed on Jenkins. Please install Docker.'
                    }
                }
            }
        }

        stage('Check and Install Docker on EC2') {
            steps {
                sshagent(['aws_ec2_ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@13.61.21.9 "
                            if ! command -v docker &> /dev/null; then
                                echo 'Docker is not installed. Installing...';
                                sudo apt update && sudo apt install -y docker.io;
                                sudo systemctl start docker;
                                sudo systemctl enable docker;
                                sudo usermod -aG docker ubuntu;
                            else
                                echo 'Docker is already installed on EC2.';
                                docker --version;
                            fi"
                    '''
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
                    echo 'Building Docker image...'
                    if (fileExists('Dockerfile')) {
                        sh 'docker build --platform linux/amd64 -t virajsamarasinghe/frontend:latest .'
                    } else {
                        error "Dockerfile not found in the repository."
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: '17c557a3-d03f-4d55-95de-d30503ff06da', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    echo 'Pushing Docker image to Docker Hub...'
                    if (sh(script: 'docker images -q virajsamarasinghe/frontend:latest', returnStatus: true) == 0) {
                        retry(3) {
                            sh 'docker push virajsamarasinghe/frontend:latest'
                        }
                    } else {
                        error "Docker image not found. Build step might have failed."
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['aws_ec2_ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@13.61.21.9 "
                            sudo docker pull virajsamarasinghe/frontend:latest && \
                            sudo docker stop frontend || true && \
                            sudo docker rm frontend || true && \
                            sudo docker run -d --name frontend -p 3000:3000 virajsamarasinghe/frontend:latest"
                    '''
                }
            }
        }
    }
}

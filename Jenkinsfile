pipeline {
    agent any

    environment {
        // Add Docker binary directory to PATH for Jenkins on Windows
        PATH = "C:\\Program Files\\Docker\\Docker\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Check Docker Installation on Jenkins') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker --version'
                    } else {
                        bat 'docker --version'
                    }
                }
            }
        }

        stage('Check and Install Docker on EC2') {
    steps {
        script {
            def cmd = '''
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
            bat "bash -c \"${cmd.replaceAll('"', '\\"')}\""
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
                        bat 'docker build --platform linux/amd64 -t kavishkakalhara/frontend:latest .'
                    } else {
                        error "Dockerfile not found in the repository."
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                    }
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    echo 'Pushing Docker image to Docker Hub...'
                    if (bat(script: 'docker images -q kavishkakalhara/frontend:latest', returnStatus: true) == 0) {
                        retry(3) {
                            bat 'docker push kavishkakalhara/frontend:latest'
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
                    script {
                        def deployCmd = '''
                            ssh -o StrictHostKeyChecking=no ubuntu@13.61.21.9 "
                                sudo docker pull kavishkakalhara/frontend:latest && \
                                sudo docker stop frontend || true && \
                                sudo docker rm -f frontend || true && \
                                sudo docker run -d --name frontend -p 5000:5000 kavishkakalhara/frontend:latest"
                        '''
                        bat "bash -c \"${deployCmd.replaceAll('"', '\\"')}\""
                    }
                }
            }
        }
    }
}

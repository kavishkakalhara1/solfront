pipeline {
    agent any

    environment {
        // Docker path for Windows
        PATH = "C:\\Program Files\\Docker\\Docker\\resources\\bin;${env.PATH}"
    }

    stages {
        stage('Check Docker Installation on Jenkins') {
            steps {
                script {
                    bat 'docker --version'
                }
            }
        }

        stage('Check and Install Docker on EC2') {
            steps {
                sshagent(['aws_ec2_ssh']) {
                    script {
                        // Use OpenSSH (ssh.exe) instead of Bash
                        def cmd = """
                            ssh -o StrictHostKeyChecking=no ubuntu@13.61.21.9 ^
                            "if ! command -v docker >nul 2>&1; then ^
                                echo Docker is not installed. Installing... && ^
                                sudo apt update && sudo apt install -y docker.io && ^
                                sudo systemctl start docker && ^
                                sudo systemctl enable docker && ^
                                sudo usermod -aG docker ubuntu; ^
                            else ^
                                echo Docker is already installed on EC2. && ^
                                docker --version; ^
                            fi"
                        """
                        bat cmd
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
                    bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
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
                        // Use OpenSSH with Windows batch syntax
                        def deployCmd = """
                            ssh -o StrictHostKeyChecking=no ubuntu@13.61.21.9 ^
                            "sudo docker pull kavishkakalhara/frontend:latest && ^
                             sudo docker stop frontend || exit 0 && ^
                             sudo docker rm -f frontend || exit 0 && ^
                             sudo docker run -d --name frontend -p 5000:5000 kavishkakalhara/frontend:latest"
                        """
                        bat deployCmd
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
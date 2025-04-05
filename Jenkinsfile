environment {
    PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH"
    IMAGE_NAME = "virajsamarasinghe/frontend:latest"
    EC2_USER = "ubuntu"
    EC2_HOST = "13.61.21.9"
    SSH_CRED_ID = "aws_ec2_ssh"
    DOCKER_CRED_ID = "17c557a3-d03f-4d55-95de-d30503ff06da"
}

stages {
    stage('Check Docker on Jenkins') {
        steps {
            script {
                if (sh(script: 'which docker', returnStatus: true) == 0) {
                    echo '✅ Docker is installed on Jenkins.'
                    sh 'docker --version'
                } else {
                    error '❌ Docker is not installed on Jenkins.'
                }
            }
        }
    }

    stage('Check Docker on EC2') {
        steps {
            sshagent([env.SSH_CRED_ID]) {
                sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        if ! command -v docker &> /dev/null; then
                            echo "Docker not found. Installing...";
                            sudo apt-get update && sudo apt-get install -y docker.io;
                            sudo systemctl start docker;
                            sudo systemctl enable docker;
                            sudo usermod -aG docker ${EC2_USER};
                            echo "Docker installed.";
                        else
                            echo "✅ Docker is already installed.";
                            docker --version;
                        fi
                    '
                """
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
                echo "🔨 Building Docker image: ${IMAGE_NAME}"
                if (fileExists('Dockerfile')) {
                    sh "docker build --platform linux/amd64 -t ${IMAGE_NAME} ."
                } else {
                    error "❌ Dockerfile not found."
                }
            }
        }
    }

    stage('Docker Hub Login') {
        steps {
            withCredentials([usernamePassword(credentialsId: env.DOCKER_CRED_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
            }
        }
    }

    stage('Push to Docker Hub') {
        steps {
            script {
                echo "📦 Pushing image to Docker Hub: ${IMAGE_NAME}"
                def imageExists = sh(script: "docker images -q ${IMAGE_NAME}", returnStdout: true).trim()
                if (imageExists) {
                    retry(3) {
                        sh "docker push ${IMAGE_NAME}"
                    }
                } else {
                    error "❌ Image ${IMAGE_NAME} not found. Build might have failed."
                }
            }
        }
    }

    stage('Deploy to EC2') {
        steps {
            sshagent([env.SSH_CRED_ID]) {
                sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        echo "🚀 Pulling latest image...";
                        sudo docker pull ${IMAGE_NAME};
                        echo "🧼 Stopping existing container (if running)...";
                        sudo docker stop frontend || true;
                        sudo docker rm frontend || true;
                        echo "🚀 Starting new container...";
                        sudo docker run -d --name frontend -p 5000:5000 ${IMAGE_NAME};
                        echo "✅ Deployed successfully.";
                    '
                """
            }
        }
    }
}
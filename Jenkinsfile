pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ChamodiJayakody/SolveIt-frontend.git'
            }
        }

       

       
    }

    post {
        always {
            echo 'Frontend Pipeline completed!'
        }
        success {
            build job: 'SolveIt-Backend-Pipeline' // Trigger Backend Job
        }
    }
}
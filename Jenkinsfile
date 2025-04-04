pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/kavishkakalhara1/solfront.git'
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
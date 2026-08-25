pipeline {

    agent any

    options {
        skipStagesAfterUnstable()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Maven Test') {
            steps {
                echo 'Running Maven tests...'

                dir('backend') {
                    sh 'mvn clean test'
                }
            }
        }

        stage('Maven Package') {
            steps {
                echo 'Creating JAR file...'

                dir('backend') {
                    sh 'mvn package -DskipTests'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'

                sh 'docker compose build'
            }
        }

        stage('Deploy 3-Tier Application') {
            steps {
                echo 'Deploying application...'

                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'

                sh 'sleep 10'
                sh 'curl -f http://localhost/'
                sh 'curl -f http://localhost/api/employees'
            }
        }
    }

    post {

        success {
            echo '3-tier Employee Management deployed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}

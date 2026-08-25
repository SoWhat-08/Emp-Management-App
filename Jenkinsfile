pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Maven Test') { steps { dir('backend') { sh 'mvn clean test' } } }
    stage('Build & Deploy 3-Tier') {
      steps { sh 'docker compose down || true; docker compose up -d --build' }
    }
    stage('Verify') {
      steps { sh 'sleep 15; curl -fsS http://localhost/; curl -fsS http://localhost/api/employees' }
    }
  }
  post { success { echo '3-tier Employee Management deployed successfully!' } failure { echo 'Pipeline failed. Check the stage logs.' } }
}

pipeline {
   environment {
             imageName = "$env.DOCKER_REG_URL" + '/vacationer'
             scannerHome = tool 'SonarQubeScanner'
             server = "$env.AWS_PROD_DEMO_1"
             url = "$env.DOCKER_REG_URL_HTTPS"
             cred = "$env.DOCKER_REG_CRED"
   }
  agent {
    node {
      label 'host-2-jenkins-dind-nodejs-slave'
    }
  }

  stages {
    stage ('Verify Tools'){
      steps {
            parallel (
              node: { sh "npm -v" },
              docker: { sh "docker -v" },
              artillery: { sh "artillery -V" }
            )
      }
    }


/*  stage('Static Code Analysis'){
       SonarQube Analysis
      steps {
            withSonarQubeEnv('Host-2-SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
            timeout(time: 1, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
            }
      }
  }*/

  stage('Build Frontend'){
      /* Build React Frontend  */
      steps{
           sh 'cd frontend && npm install && npm run build'
      }
  }

  stage('Build Docker Image & Publish'){
      /* Build Docker Image & Publish to Nexus Local  Private Docker registry  */
      steps{
             script {
               dockerImage = docker.build( imageName + ":$BUILD_NUMBER" ,"-f .docker/prod/Dockerfile .")
                docker.withRegistry( url , cred ) {
                  dockerImage.push()
                }
             }
      }
  }


 /* Production Env; Deploy Docker image to AWS Production Server and run*/
   stage ('Deploy To AWS') {
       steps{
          sshagent(credentials : ['AWS-eu-central-key']) {
              sh 'ssh -o StrictHostKeyChecking=no ubuntu@${server} uptime'
              sh 'ssh -v ubuntu@$server'
              sh 'ssh ubuntu@$server sudo docker pull' +" " + "$imageName" + ":$BUILD_NUMBER"
              sh 'ssh ubuntu@$server sudo docker run --detach  --name shop-api  --restart=always --env "VIRTUAL_HOST=shop.romandulman.com" --env  "LETSENCRYPT_HOST=shop.romandulman.com"' +" " + "$imageName" + ":$BUILD_NUMBER"
          }
       }
   }

  }
}


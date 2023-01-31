pipeline {
    agent any
    stages {
        stage('client exist') {
      when {
        expression { sh 'docker inspect client &> /dev/null' }
      }
      steps {
        echo 'client containser exist...'
        sh 'docker stop client'
        sh 'docker rm -f client'
        sh 'docker rmi agora:client'
      }
        }
        stage('server exist') {
      when {
        expression { sh 'docker inspect server &> /dev/null' }
      }
      steps {
        echo 'server container exist...'
        sh 'docker stop server'
        sh 'docker rm server'
        sh 'docker rmi agora:server'
      }
        }
        stage('client build') {
      steps {
        echo 'client dockerfile build......'
        sh 'docker build -f client/Dockerfile -t agora:client .'
        echo 'client build success ........'
      }
        }
    stage('server build') {
      steps {
        echo 'server dockerfile build......'
        sh 'docker build -f server/Dockerfile -t agora:server .'
        echo 'server build success ........'
      }
    }
    }
}

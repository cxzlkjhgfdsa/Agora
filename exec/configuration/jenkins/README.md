# Jenkins Pipeline

-   Jenkins Pipeline을 사용하여 CI/CD 구성

## Docker image Build

```groovy
pipeline {
  agent any
  stages {
    stage('repository clone') {
      steps {
        git branch: 'release', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12A705.git'
      }
    }
    stage('remove unused images') {
      steps {
        script {
          try {
            sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
        } catch (e) {
            echo 'no unused images'
          }
        }
      }
    }
    stage('stop web service') {
      steps {
        script {
          try {
            sh 'docker rm -f backend && docker rm -f client'
        }catch (e) {
            echo 'no container running'
          }
        }
      }
    }
    stage('parallel build') {
      parallel {
        stage('client build') {
          steps {
            sh 'docker build -f client/Dockerfile -t nowgnas/agora:client .'
          }
        }
        stage('server build') {
          steps {
            sh 'docker build -f server/Dockerfile -t nowgnas/agora:backend .'
          }
        }
      }
    }
    stage('push build images') {
      steps {
        sh 'docker login -u nowgnas -p dltkddnjs!!'
        sh 'docker push nowgnas/agora:backend'
        sh 'docker push nowgnas/agora:client '
      }
    }
  }
}
```

-   프로젝트 clone 후 client, server 폴더 Docker image 빌드
-   병렬 파이프라인 구성으로 빌드 시간 단축
-   빌드 후 Docker hub에 이미지 push

## Deploy

```groovy
pipeline {
  agent any
  stages {
    stage('stop web service') {
      steps {
        script {
          try {
            sh 'docker rm -f server && docker rm -f client'
        }catch (e) {
            echo 'no container running'
          }
        }
      }
    }
    stage('run docker compose') {
      steps {
        sh 'docker login -u nowgnas -p dltkddnjs!!'
        sh 'cd /home/ubuntu && docker-compose up -d'
      }
    }
    stage('remove unused images') {
      steps {
        script {
          try {
            sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
        } catch (e) {
            echo 'no unused images'
          }
        }
      }
    }
  }
}
```

-   Docker hub에서 image pull, container run
-   추후 운영, 개발 서버 분리, 빌드 배포 분리를 위한 경험

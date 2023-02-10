# AGORA

## Member

|  이름  |  포지션  | 역할            |
| :----: | :------: | --------------- |
| 김용현 | Frontend | Frontend Leader |
| 오윤식 | Backend  | 서비스 기획     |
| 윤재휘 | Frontend | UI/UX 담당      |
| 이상원 | Backend  | PM, DevOps      |
| 이승헌 | Backend  | Backend Leader  |
| 전인덕 | Frontend | UI/UX 담당      |

## Commit Message Convention

-   제목은 최대 50글자가 넘지 않도록 하고 마침표 및 특수기호는 사용하지 않는다.
-   영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자로 표기한다.(과거 시제를 사용하지 않는다.)
-   제목은 **개조식 구문**으로 작성한다. --> 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미.

```shell
# 커밋 메세지 작성
# ex: [feat]: 로그인 기능 시작

# 커밋 세부 내용 아래 작성

# 커밋 메세지 컨벤션
# [feat] : 새로운 기능 추가
# [fix] : 버그 수정
# [docs] : 문서 수정
# [style] : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
# [refactor] : 코드 리펙토링
# [test] : 테스트 코드, 리펙토링 테스트 코드 추가
# [chore] : 빌드 업무 수정, 패키지 매니저 수정
```

## Code Convention

### 공통 컨벤션

-   변수명은 camel case로 작성

### Frontend

-   prettierrc.json으로 설정
-   tab: 4

### Backend

-   intellij 세팅 통일
-   package 구조 domain 기반

## Branch Strategy

Branch 전략은 `git flow`를 사용한다.

| Branch      | detail                     | ex                   |
| :---------- | -------------------------- | :------------------- |
| master      | 배포 가능 브랜치           | master               |
| development | 개발 브랜치                | front/dev            |
| feature     | 기능 개발 브랜치           | feat/back/user-login |
| release     | 배포 준비 브랜치           | release/1.0          |
| hotfix      | 출시 버전 버그 수정 브랜치 | hotfix-1.1.0         |
| document    | 문서 작업 브랜치           | docs/readme          |

### branch 구성

-   master
    -   dev
        -   back/dev
            -   feat-login-back
        -   front/dev
            -   feat-login-front
    -   docs/readme

## Project Structure

![full_structure](https://user-images.githubusercontent.com/55802893/212011394-0a91a910-2779-41d6-a45b-a766b4798103.png)

-   jenkins와 nginx를 이용한 무중단 배포 (Blue, Green 전략)

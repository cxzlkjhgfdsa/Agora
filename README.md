# AGORA

## Member

|  이름  |  포지션  | 역할                                                       |
| :----: | :------: | ---------------------------------------------------------- |
| 김용현 | Frontend | **Frontend Leader**                                        |
| 오윤식 | Backend  | **서비스 기획**                                            |
| 윤재휘 | Frontend | **UI/UX 담당**                                             |
| 이상원 | Backend  | **PM, DevOps**<br>Jenkins CI/CD<br>Nginx SSL<br>Auth Token |
| 이승헌 | Backend  | **Backend Leader**                                         |
| 전인덕 | Frontend | **UI/UX 담당**                                             |

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

### 프로젝트 페르소나

-   이름
    -   김싸피
-   나이
    -   26
-   직업
    -   면접에 자꾸 떨어지는 취준생
-   성격
    -   조용한 편
-   현재 상황
    -   타인의 의견을 잘 이해하고, 본인의 생각을 조리있게 전달하는 능력의 필요성을 느낌
    -   익숙하지 않은 주제에 대한 정보도 얻고자 함
-   스토리
    -   김싸피는 대학교를 졸업하고 취업을 준비하고 있는 20대이다. 여러 기업에 지원을 하였으나, 수줍은 성격 탓에 PT 면접과 그룹 토론 면접에서 좋은 모습을 보여주지 못했다. 김싸피는 자신감을 얻기 위해 타인과의 논리적인 말하기를 연습하고 싶고, 다양한 주제에 대한 식견을 넓혀 면접에서 유리한 고지를 점하고자 한다.

---

-   이름
    -   이싸피
-   나이
    -   18
-   직업
    -   고등학생
-   성격
    -   활발
    -   호기심 많음
    -   말하기 좋아함
-   취미
    -   인터넷 방송 시청
-   현재 상황
    -   교내 토론대회 수상을 목표로 함
    -   인터넷 방송인 토론에 재미를 느껴 비슷한 컨텐츠를 찾고 있음
-   스토리 및 상황 요약
    이제 이싸피는 고등학생 2학년으로 올라간다.
    그래서 이싸피는 대학 진학을 위해 생활기록부를 채우려 하는데, 마침 교내토론대회가 개최되어 입상을 위해 준비하고 있다.
    학교에서 대학 진학을 열심히 준비한 이싸피는 하교 후에는 인터넷 방송을 보며 휴식을 즐긴다.
    좋아하는 스트리머의 방송을 시청하던 중 가볍고 재미있는 주제의 토론 컨텐츠에 흥미를 느껴 자신도 해보고 싶다고 느낀다.

### 명세서

**기능 명세서**: [기능 명세서 Notion](https://accessible-area-411.notion.site/0b63bdefda0b4a3a91a308ec3b047042?v=54d8dc4185ca408bac630407493039b6)

**비기능 명세서**: [비기능 명세서 Notion](https://accessible-area-411.notion.site/2532e33a2fa545358d33e011cc0de3be)

### Sequence Diagram

시퀀스 다이어그램은 [sequence diagram](./docs/sequence_diagram/reamde.md) 에서 확인하실 수 있습니다.

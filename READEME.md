# Medium Clone coding

## **Context**

- 처음으로 사용해보는 스택으로 Medium 클론 코딩을 진행할 예정입니다.
- 기존에 다른 프로젝트나 경험이 있을 수 있지만, Medium 클론 코딩을 위한 스택은 처음 다뤄보는 상황입니다.

## **Object**

### **Functional Goals**

- 사용자 인증 및 회원 관리 기능을 구현하여 사용자가 회원 가입, 로그인, 프로필 수정 등을 할 수 있도록 합니다.
- 글 작성, 편집, 삭제 기능을 구현하여 사용자가 컨텐츠를 생성하고 관리할 수 있도록 합니다.
- 글 목록, 검색, 필터링 기능을 구현하여 사용자가 원하는 글을 쉽게 찾을 수 있도록 합니다.
- 댓글, 답글, 토론 기능을 구현하여 사용자 간 소통과 토론을 가능하게 합니다.
- 인기/추천 글, 좋아요, 공유, 북마크 등의 기능을 구현하여 사용자들에게 흥미로운 컨텐츠를 제공합니다.
- 프로필 관리, 팔로우/팔로워 관리 기능을 구현하여 사용자들 간의 소셜 네트워크를 형성합니다.

### Technical Goals

- 선택한 스택을 효율적으로 활용하여 안정적이고 성능 좋은 웹 애플리케이션을 개발합니다.
- 코드의 구조와 모듈화를 고려하여 유지보수가 용이하고 확장 가능한 애플리케이션을 만듭니다.
- 테스트 주도 개발(TDD) 원칙을 따라 유닛 테스트, 통합 테스트 등을 포함한 품질 좋은 코드를 작성합니다.
- 최신의 개발 트렌드와 권장 사항을 고려하여 최신 기술과 도구를 활용합니다.
- 프로젝트 관리 및 협업을 위해 소스 코드 버전 관리, 이슈 트래킹, 협업 도구 등을 적절히 활용합니다.

### **Learning Goals**

- 선택한 스택과 기술들을 실제로 사용하면서 학습하고 익히는 것을 목표로 합니다.
- Medium의 핵심 기능과 아키텍처를 이해하고, 해당 기능들을 직접 구현하며 학습합니다.
- 문제 해결 능력과 창의성을 발휘하여 필요한 기능이나 개선점을 스스로 도출하고 구현해봅니다.
- 적극적인 검색과 자료 조사를 통해 스스로 문제를 해결하고 지속적인 학습을 추구합니다.

### **최종 목표**

- **위의 목표들을 토대로 Medium 클론 코딩을 진행하고, 스택을 효과적으로 활용하며 웹 애플리케이션 개발과 관련한 다양한 경험과 학습을 쌓는 것이 목표입니다.**

# STACK

### FRONT-END

- Typescript
- ReactJS
- NEXTJS
- React-Native
- GrapeQL
- Apollo Client
- Testing Library
- Tailwind

### BACK-End

- NodeJS
- NestJS
- TypeORM
- Apollo Server
- GrapeQL

### Database

- PostgreSQL

### Front Testing Stack

- React Testing Library
- Jest
- Cypress

### Back Testing Stack

- Supertest
- Jest

# TODO LIST

## **Guest**

**사용자 인증 및 회원 가입**

- 회원 가입을 통한 사용자 계정 생성
- 로그인 기능을 통해 계정으로 인증

**게시물 목록 조회**

- 게시물 목록 표시
- 페이지네이션 기능을 통한 페이지 전환

**게시물 검색**

- 키워드를 입력하여 게시물 검색
- 검색 결과에 따른 게시물 목록 표시

**게시물에 대한 댓글 조회**

- 게시물에 작성된 댓글 목록 표시
- 각 댓글의 작성자, 작성일 등 댓글 정보 표시

**게시물 공유**

- 게시물의 링크를 복사하여 다른 사람과 공유
- 소셜 미디어 등을 통해 게시물 공유

**게시물 상세보기**

- 특정 게시물의 상세 내용 표시
- 작성자, 작성일 등 게시물 정보 표시

## **LOGIN**

**사용자 인증 및 회원 관리**

- 회원 가입
- 로그인
- 비밀번호 재설정
- 프로필 수정
- 로그아웃

**프로필 관리**

- 프로필 정보 표시
- 프로필 수정
- 작성한 게시물 목록
- 좋아요한 게시물 목록

**소셜 미디어 연동**

- 게시물 소셜 미디어 공유
- 소셜 미디어 계정 연동

**게시물 목록 및 검색**

- 최신 게시물 목록
- 인기 게시물 목록
- 태그별 게시물 목록
- 검색 기능

**댓글 및 토론**

- 댓글 작성
- 댓글 삭제
- 댓글에 대한 답글 작성
- 토론 기능

**게시물 작성 및 편집**

- 게시물 작성
- 게시물 수정
- 게시물 삭제
- 게시물 편집기

**태그 및 카테고리**

- 게시물에 태그 부여
- 게시물 카테고리 지정
- 태그별 게시물 필터링
- 카테고리별 게시물 필터링

**인기/추천 게시물**

- 인기 게시물 표시
- 추천 게시물 표시

**북마크**

- 게시물 북마크
- 북마크한 게시물 목록

**팔로우 및 팔로워**

- 다른 사용자 팔로우
- 팔로워 관리

**알림 및 구독**

- 알림 설정
- 팔로우한 사용자의 글 알림
- 사용자 구독

**통계 및 분석**

- 게시물 조회수 통계
- 좋아요 수 통계
- 댓글 수 통계

**권한 관리**

- 관리자 권한 설정
- 사용자 및 게시물 관리
- 권한 부여 및 제한

**검색 및 필터링**

- 키워드 검색
- 필터 적용

**좋아요 및 공유**

- 게시물에 좋아요 표시
- 게시물 공유

# User Interaction and Content Management

### **사용자 인증 및 회원 관리**

- 회원 가입: `/signup`
- 로그인: `/login`
- 비밀번호 재설정: `/reset-password`
- 프로필 수정: `/profile/edit`
- 로그아웃: `/logout`

### **글 작성 및 편집**

- 글 작성: `/posts/create`
- 글 수정: `/posts/:postId/edit`
- 글 삭제: `/posts/:postId/delete`
- 텍스트 편집기: `/editor`

### **글 목록 및 검색**

- 최신 글 목록: `/posts`
- 인기 글 목록: `/posts/popular`
- 태그별 글 목록: `/tags/:tag`
- 검색 기능: `/search?q=:keyword`

### **좋아요 및 공유**

- 글에 좋아요 표시: `/posts/:postId/like`
- 글 공유: `/posts/:postId/share`

### **댓글 및 토론**

- 댓글 작성: `/posts/:postId/comments/create`
- 댓글 삭제: `/posts/:postId/comments/:commentId/delete`
- 댓글에 대한 답글 작성: `/posts/:postId/comments/:commentId/reply`
- 토론 기능: `/posts/:postId/discussion`

### **프로필 관리**

- 프로필 정보 표시: `/profile`
- 프로필 수정: `/profile/edit`
- 작성한 글 목록: `/profile/posts`
- 좋아요한 글 목록: `/profile/liked-posts`

### **태그 및 카테고리**

- 글에 태그 부여: `/posts/:postId/tags/create`
- 글 카테고리 지정: `/posts/:postId/category/set`
- 태그별 글 필터링: `/tags/:tag`
- 카테고리별 글 필터링: `/categories/:category`

### **알림 및 구독**

- 알림 설정: `/notifications/settings`
- 팔로우한 작가의 글 알림: `/notifications/followed-authors-posts`
- 작가 구독: `/authors/:authorId/subscribe`

### **팔로우 및 팔로워**

- 다른 사용자 팔로우: `/users/:userId/follow`
- 팔로워 관리: `/followers`

### **인기/추천 글**

- 인기 글 표시: `/posts/popular`
- 추천 글 표시: `/posts/recommended`

### **북마크**

- 글 북마크: `/posts/:postId/bookmark`
- 북마크한 글 목록: `/bookmarks`

### **통계 및 분석**

- 글 조회수 통계: `/posts/:postId/stats/views`
- 좋아요 수 통계: `/posts/:postId/stats/likes`
- 댓글 수 통계: `/posts/:postId/stats/comments`

### **권한 관리**

- 관리자 권한 설정: `/admin/set-permissions`
- 사용자 및 글 관리: `/admin/users`
- 권한 부여 및 제한: `/admin/permissions`

### **검색 및 필터링**

- 키워드 검색: `/search?q=:keyword`
- 필터 적용: `/posts/filter?category=:category&tag=:tag`

### **소셜 미디어 연동**

- 글 소셜 미디어 공유: `/posts/:postId/social-share`
- 소셜 미디어 계정 연동: `/social-media/connect`

# **Sequence of tasks**

1. UI/UX 디자인
2. 프로젝트 설정 (Next.js 및 TypeScript 설정, Apollo Client 구성)
3. 데이터 모델링 (PostgreSQL 데이터베이스 설정, TypeORM을 사용하여 데이터베이스 스키마 설계)
4. 백엔드 개발 (Apollo Server 및 Nest.js를 사용한 GraphQL 스키마 작성 및 리졸버 구현,TypeORM을 사용하여 데이터베이스와의 상호 작용 구현)
5. 프론트엔드 개발 (Next.js와 Apollo Client를 사용한 페이지 및 컴포넌트 작성)
6. 테스트 (Jest를 사용한 단위 테스트 및 통합 테스트 작성)
7. 배포 (Next.js의 정적 사이트 생성 기능을 사용한 정적 파일 생성 및 호스팅, 서버 인프라 설정 및 배포)

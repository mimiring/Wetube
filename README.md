# Wetube

[스샷]

Cloning Youtube with Vanilla and NodeJS 헤로쿠에 디플로이 [링크](https://dashboard.heroku.com/apps/mimiringtube)


## 설치하기

```
git clone https://github.com/mimiring/Wetube.git
cd Wetube
npm install
```

> 본 프로젝트에서는 몽고디비 사용하기 때문에 별도 설치 필요


## npm scripts

### development 환경으로 시작하기
```bash
npm run dev:server  # node 서버 시작하기
npm run dev:assets  # 클라이언트 assets번들링(javascript, scss)
```

### production 환경으로 시작하기
```bash
npm run start
```
> prestart스크립트가 자동으로 `npm run build`실행

### 빌드
```bash
npm run build:server
npm run build:assets
```
> `npm run build` 명령으로 동시 실행할 수 있음. `static`, `view` 폴더는 `build`폴더 내로 복사됨.

`assets` 폴더는 `build:server`에서 제외되며, `build:assets` 스크립트를 통해 산출물을 `static`폴더로 반환한다.

> webpack을 사용하여 모든 클라이언트측 Javascript 파일 컴파일(babel) 하고 scss파일을 전처리

### 헤로쿠

자동으로 `build`, `start` 스크립트가 실행됨

### 프로젝트 구조
```
./Wetube
└── src
   ├── assets : 클라이언트 javascript, scss파일
   ├── controller : 컨트롤러
   ├── models : 모델
   ├── routers : express 라우터
   ├── static : assets산출물
   ├── views : pug 컴포넌트
   ├── app.js : express 서버
   ├── db.js : 몽고디비
   ├── init.js : entry파일
   ├── middlewares.js : express미들웨어
   ├── passport.js : Passport 관련 스크립트
   ├── routes.js : 라우트 상수
   └── webpack.config.js : 웹팩설정
```

### 주요 기능
- Pug 템플릿 엔진을 사용하여 UI 컴포넌트 분리
- Webpack으로 클라이언트에 Sass, Javascript 번들링
- Passport를 사용한 로그인(로컬, Github)
- MongoDB 사용하여 동영상 CRUD 구현(AWS S3에 저장)
- 회원가입/로그인/프로필수정
- 게시물 댓글 작성 및 삭제

## 페이지:
- Home
- Join
- Login
- Search
- User Detail
- Edit Profile
- Change Profile
- Upload Video
- Edit Video
- Recording
- Video Detail


# Nuber Eats

The backend of nuber eats clone

```bash

CreactReactApp
  ├─public
  │  └─...config files
  ├─src
  │  ├─__generated__  # Apollo Tooling (codegen)
  │  ├─components
  │  │  ├─Button.tsx
  │  │  └─form-error.tsx
  │  ├─images
  │  ├─pages
  │  │  ├─create-account.tsx  # 회원가입
  │  │  ├─login.tsx # 로그인
  │  ├─routers
  │  │  ├─logged-in-router.tsx  # 로그인 상태일때 router master page
  │  │  └─logged-out-router.tsx # 로그아웃 상태일때 router master page
  │  ├─styles # CSS group
  │  ├─apollo.ts  #  apollo configure
  │  ├─App.tsx
  │  ├─...config files
  │  └─...test files
  └─eslint,env,prettier etc config files

```

## Challenge

-   [x] SetUp apollo client, apollo tooling, tailwindCss, react router
-   [x] send auth token to server
-   [x] logged out router
-   [x] looged in router

-   [x] Main(Restaurants) page
-   [x] login page
-   [x] create account page
-   [x] Edit profile page
-   [x] verify email page
-   [x] 404(not found) page
-   [x] category page
-   [x] search page
-   [x] restaurant detail page

-   [x] App Tests
-   [x] Button Tests
-   [x] Form Error and Restaurant Tests
-   [x] Header and 404 Tests
-   [x] Login Tests
-   [x] Create account Tests

## Using NPM libraries

`tailwindcss : css framework` -> [Docs](https://tailwindcss.com/docs/installation)<br/>
`autoprefixer : css property중 브라우저 호환이 안되는 property를 호환이 가능 하게끔 도와주는 라이브러리`<br/>
`apollo codegen : 클라이언트와 서버를 스키마 유효성 검사, 서버와의 호환성을위한 작업 린팅, 향상된 클라이언트 측 유형 안전성을위한 정적 유형 생성을위한 도구` -> [Docs](https://github.com/apollographql/apollo-tooling) (global 설치 권장)<br/>
`rimraf : package에서 script명령을 실행하기 위함, 특정 파일 삭제시 window, mac등 OS의 차별을 피하기 위한 방법`<br/>
`react-helmet-async : 기본 'react-helmet'을 사용할 경우 콘솔에 오류 발생으로 인한 대안`<br/>
`mock-apollo-client : apollo-client를 테스트 하기 위한 또 다른 라이브러리 (복잡한 apollo 테스트가 가능)`
-> [NPM](https://www.npmjs.com/package/mock-apollo-client)

---
layout: post
cover: false
title: "OAuth2에 대해 알아보자"
date: 2017-01-05 10:18:00
tags: Develop
subclass: 'post tag-develop'
cover: 'assets/images/cover_develop.jpg'
navigation: True
logo: 'assets/images/ghost.png'
---

먼저 OAuth 인증을 이해하기 위해 필요한 몇 가지 개념들에 대해 알아보자. OAuth 인증을 진행할 때 해당 서비스 제공자는 '제 3자가 어떤 정보나 서비스에 사용자의 권한으로 접근하려 하는데 허용하겠느냐'라는 안내 메시지를 보여 주는 것이다.

   ​   ​

### 인증과 허가

1. Authentication : 인증
2. Authorization : 허가

   ​   ​

일반 로그인은 사원이 63빌딩에 출입하는 것이라면, (사원증이 있어야 출입가능)

OAuth는 1층에서 방문증을 수령한 후 63빌딩에 출입하는 것이다. (방문증만 있어도 출입가능)

   ​   ​

## OAuth 1.0의 특징

기존의 다른 인증방식(OpenID)과 구분되는 특징은 크게 두 가지이다.

1. API 인증 시, 써드파티 어플리케이션에게 사용자의 비번을 노출하지 않고 인증할 수 있다는 점
2. 인증(Authentication)과 API 권한(Authorization) 부여를 동시에 할 수 있다는 점

   ​

## OAuth 1.0의 동작방식

OAuth 1.0은 기본적으로 user / consumer / service provider가 있어야 한다.

OAuth 1.0 인증을 3-legged OAuth 라고도 하는데 결국 주체가 셋 이라는 말이다.

![oauth1_triangle](assets/images/oauth1_triangle.png)

우리의 서비스에서 트위터 로그인을 연동한다고 가정해보자. 사용자 입장에서는 아이디 / 비밀번호를 통해 가입하면 그 정보를 이용해서 무슨 짓을 할지 모르기 때문에 꺼려한다. OAuth 1.0은 우리의 서비스(Consumer)에게 인증토큰 (Access Token)만을 전달하고 서비스에서 인증토큰으로 트위터 API(Service Provider)를 사용할 수 있도록 해준다.

   ​

### Outh 1.0 프로세스

1. 사용자(User)가 트위터 로그인 요청
2. 사용자를 트위터(Service Provider) 로그인 화면으로 리다이렉트
3. 트위터 로그인 진행
4. 서비스(Consumer)로 인증토큰(Access Token)이 전달

   ​

### 인증토큰의 장점

- 사용자의 아이디 / 패스워드를 몰라도 토큰을 통해 허가 받은 API에 접근 가능
- 필요한 API에만 제한적으로 접근할 수 있도록 권한 제어 가능
- 저장되어 있는 인증토큰이 유출되더라도 트위터의 관리자 화면에서 인증토큰의 권한 취소 가능
- 사용자가 트위터(Service Provider)의 패스워드를 변경해도 인증토큰은 계속 유효

   ​

## OAuth 2.0의 개선사항

일단 OAuth 2.0은 1.0과 호환되지 않으며 용어부터 많은 것이 다르다. 모바일에서의 사용성 문제나 서명과 같은 개발이 복잡하고 기능과 규모의 확장성 등을 지원하기 위해 만들어진 표준이다. 표준이 매우 크고 복잡해서 이름도 "OAuth 인증 프레임워크(OAuth 2.0 Authorization Framework)" 이다. [http://tools.ietf.org/wg/oauth/](http://tools.ietf.org/wg/oauth/) 에서 확인 가능

   ​

### OAuth 1.0에서 개선된 사항

1. 용어 변경
   - Resource Owner : 사용자
   - Resource Server : REST API 서버
   - Authorization Server : 인증서버 (API 서버와 같을 수도 있음)
   - Client : 써드파티 어플리케이션 (서비스)

   ​

2. 간단하고 직관적
   - OAuth 1.0에서는 HTTPS가 필수
   - Signature 없이 생성, 호출 가능
   - URL 인코딩이 필요없음

   ​

3. 더 많은 인증 방법을 지원
   - 이전에는 HMAC을 이용한 암호화 인증만 지원
   - OAuth 2.0은 여러 인증 방식을 통해 웹 / 모바일 등 다양한 시나리오에 대응 가능
   - Access Token의 Life-time을 지정하여 만료일 설정 가능

   ​

4. 대형 서비스로의 확장성 지원
   - 커다란 서비스는 인증 서버를 분리하거나 다중화 할 수 있어야 함
   - Authorization Server의 역할을 명확히 하여 이에 대한 고려가 되었음

   ​

## OAuth 2.0 사용 서비스

2013년까지만 해도 1.0만 지원하거나 2.0으로 개선하는 인터넷 서비스 기업이 많았지만,

현재는 대부분 2.0만 지원한다고 봐도 무방하다. (1.0은 자체 로그인에만 사용하는 기업이 많음)

- Facebook, Instagram, Google, LinkedIn, Twitter...

   ​

## 참고하면 좋은 자료

- Naver D2 : [http://d2.naver.com/helloworld/24942](http://d2.naver.com/helloworld/24942)
- 정리 잘 된 블로그 : [http://earlybird.kr/1584](http://earlybird.kr/1584)
- 조대협의 블로그 : [http://bcho.tistory.com/942](http://bcho.tistory.com/942)
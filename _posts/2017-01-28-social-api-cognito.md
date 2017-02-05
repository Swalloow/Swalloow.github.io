---
layout: post
cover: false
title: "다양한 소셜 API를 연동하기 전에 고려할 것들 (AWS Cognito)"
date: 2017-01-28 10:18:00
tags: Develop
subclass: 'post tag-develop'
cover: 'assets/images/cover_develop.jpg'
navigation: True
logo: 'assets/images/ghost.png'
---

최근에 대부분의 웹, 모바일 어플리케이션에서 카카오, 네이버 등 다양한 소셜 로그인 기능을 제공하고 있다.
만약 우리가 만들어야 할 어플리케이션이 다양한 소셜 로그인 API와 연동하여 사용자를 관리해야한다면, OAuth 인증, 보안 등 개발할 때 고려해야할 요소가 많을 것이다.

따라서, 이 글을 통해 최근 유행하는 클라우드 기반 웹 어플리케이션 설계 방식을 아주 간단히 보고 적합한 설계 방식을 선택하는데 도움이 되었으면 좋겠다.

OAuth2.0에 대해서는 이전에 쓴 글을 참조하길 바란다. [http://swalloow.github.io/develop/OAuth2%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90/](http://swalloow.github.io/develop/OAuth2%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90/)

   ​

## 1. OAuth 2.0 Grant Flow

![OAuth2 Grant Flow1](/images/OAuth2 Grant Flow1.png)

주로 자바스크립트 기반 웹 어플리케이션에서 많이 사용하는 방식이다. (스크립트 보안 유출 고려)

최근에는 모바일에서도 많이 사용한다고 한다.

   ​

![OAuth2 Grant Flow2](/images/OAuth2 Grant Flow2.png)

직접 ID, PW 보내는 방식으로 파트너나 자사 시스템에 사용한다.

기존의 HTTP 방식을 그대로 사용하기 용이하다.

   ​

위와 같은 방식을 사용했을 때의 장점은 OAuth 2.0을 몸소 체험할 수 있다는 것이다.

반면에, 단점은 다음과 같다.
- 사용자 데이터에 대한 보안을 고려해야 한다.
- Facebook, Twitter 모두 각자에게 최적화 되어 있어 확장성을 고려한 인증 인터페이스를 만들기 힘들다.
- Token만 존재하기 때문에 사용자 관리, 사용자를 구분하기가 힘들다.
- 모바일과 웹 어플리케이션이 모두 존재한다면, 인증 및 디바이스 간 동기화 처리 문제가 있다.
- 시스템 충돌과 네트워크 연결 문제 또한 감당해야 한다.

   ​

## 2. AWS EC2 + Cognito (BaaS)

![AWS Authentication process](/images/AWS Authentication process.png)

사용자 로그인, 인증 처리에 대해 AWS Cognito를 사용한 방법이다.

기본적인 EC2 인스턴스에 Cognito만 추가해서 사용하면 된다.

   ​

이러한 방법을 적용했을 때의 단점은 일단 클라우드에 요금을 내야 한다는 것이다.

또한, AWS Cognito에서 지원하지 않는 카카오 로그인 같은 경우 복잡한 과정이 필요하다.

   ​

반면에 장점은 다음과 같다.
- SAML을 통한 보안 문제 해결.
- 놀라운 확장성. (SOCIAL IDENTITY를 추가하기만 하면 끝, 모바일 앱까지 확장 가능)
- 편리한 사용자 관리. (USER POOL 기능 제공)
- 인증 및 디바이스간 동기화 처리. (Cognito Sync가 알아서 해준다)
- 시스템 충돌과 네트워크 연결 문제. (Cognito Sync가 알아서 해준다)
- 위와 같은 문제를 신경 안쓰므로 로직에 집중해서 빠른 개발이 가능하다.

   ​

## 3. AWS Serverless Architecture (BaaS + FaaS)

![AWS WebApp Application Architecture](/images/AWS WebApp Application Architecture.png)

AWS API Gateway와 Lambda를 통한 서버리스 아키텍쳐에 대해서는 아래 링크를 참고하자.

서버리스 아키텍쳐는 서버를 관리할 필요 없이 특정 이벤트에 반응하는 함수를 등록하고, 해당 이벤트가 발생하면 함수가 실행되는 구조이다.

   ​

장점은 다음과 같다.
- 서버에 고성능이 필요할 시에는 비용이 절감된다.
- 서비스 지향적인 설계가 가능하다. (마이크로 아키텍쳐)
- 자동 스케일링
- 코드 생산에 집중할 수 있고, 유연한 배포 및 테스트가 가능하다.

   ​

반면에 단점은 다음과 같다.
- AWS 과금이 많이 나올 수 있다. (쓸데없이 많이 고려한 설계일수도)
- API Gateway, Lambda에 대한 러닝 커브가 상당하다. (많은 스터디 필요)

   ​

## 결론

최근에 유행하는 서버리스 아키텍쳐나 마이크로 아키텍쳐를 무조건 도입해야하는 것은 절대 아니다.

각자 프로젝트의 상황에 맞는 방법을 선택하는게 답인듯하다.

   ​​

## 참고하면 좋은 문서들

- [박근핵닷컴 서버 개발일지](https://medium.com/@parkgeunhack/%EC%95%8C%EB%A0%89%EC%8A%A4%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%84%9C%EB%B2%84-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%80-c3aa12baaa75#.kkskaeaqa)
- [AWS Cognito](https://aws.amazon.com/ko/cognito/?nc2=h_m1)
- [AWS Cognito Blog](https://aws.amazon.com/ko/blogs/korea/category/amazon-cognito/)
- [Serverless-Architecture](http://blog.aliencube.org/ko/2016/06/23/serverless-architectures/)
- [Popit - 마이크로서비스 아키텍쳐의 장단점](http://www.popit.kr/why-microservice/)
- [조대협 블로그 - OAuth 2.0 Architecture](http://bcho.tistory.com/942)

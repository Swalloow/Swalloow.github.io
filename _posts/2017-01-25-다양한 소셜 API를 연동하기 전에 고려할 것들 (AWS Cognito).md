---
layout: post
title: "Open API를 설계할 때 알아야 하는 것들"
modified: 2017-01-25
tags: [API, RESTful]
categories: [Develop]
---

   ​

오픈 API를 사용하다보면 공통의 패턴을 발견할 수 있을 것이다.
이처럼, API를 설계할 때도 개발자들이 쉽게 사용할 수 있도록 만든 규칙이라는게 존재한다.
오늘은 RESTful한 Open API를 설계하기 위해 알아야 하는 것들에 대해 정리해보았다.

   ​

# Open API 디자인

### API 란?

> 운영체제, 시스템, 애플리케이션, 라이브러리 등을 개발자들이 프로그래밍 작업을 통해 응용 프로그램을 작성할 수 있는 다양한 인터페이스들을 총칭한다. (예: Window API, Java API, HTML5 API, Android API…) - 네이버 개발자센터 인용

   ​

### 오픈 API 란?

> API 중에서 플랫폼의 기능 또는 컨텐츠를 외부에서 쓸 수 있도록 웹 프로토콜(HTTP)로 호출할 수 있도록 개방(open)한 API를 의미한다. 네이버 개발자센터에서 제공하고 있는 지도, 검색을 비롯 기계번역, 캡차, 단축 URL 등 대부분 API 들은 HTTP로 호출할 수 있는 오픈 API에 해당한다. - 네이버 개발자센터 인용

   ​

이제 기업 또는 사용자에게 제공할 RESTful Open API를 어떻게 설계할지 고민해보자.

기업에게 전문적으로 API를 공급하는 Apigee 사의 "Web ApI Design"을 레퍼런스로 삼았다.

   ​

# Best Web API Design Rules

### 1. 기본 URL에는 동사가 아닌 명사를 사용, 리소스마다 2개의 기본 URL을 유지하자.

 ```
 /dogs (Collection), /dogs/1234 (Element)
 ```

   ​

### 2. 올바른 HTTP 메서드(POST, GET, PUT, DELETE)를 사용하자.

 ```
 POST(create), GET(read), PUT(update), DELETE(delete)
 ```

   ​

### 3. 복수형 명사와 구체적인 이름을 사용하자.
```
/animals, /dogs
```

   ​

### 4. 자원 간의 관계를 간단히 하여 URL 계층이 깊어지는 것을 피하자.

 ```
 GET	/owners/5678/dogs?color=red
 ```

   ​

### 5. 오류 처리를 명확하게 하고 에러 스택은 절대 비공개 해야 한다.

 ```
 200 - OK
 400 - Bad Request
 500 - Internal Server Error
 201 - Created
 304 - Not Modified
 404 - Not Found
 401 - Unauthorized
 403 - Forbidden
 ```

   ​

### 6. 접두사 "v"로 버전을 지정하고 지속적인 버전 관리를 하자.

 ```
 GET	/v1/dogs
 ```

   ​

### 7. 데이터베이스에 없는 자원에 대한 응답일 경우 동사를 사용하자.

 ```
 ex) Caculate, Translate, Convert ...
 ```

   ​

### 8. 속성의 네이밍은 Javascript의 관습을 따르고 카멜 케이스를 사용하자.

 ```
 "createdAt": 123415125
 ```

   ​

### 9. 하위 도메인의 독립적인 API 요청 처리는 통일하자.

 ```
 company.com
 api.company.com	(브라우저에서 없는 도메인을 여는 경우 하위 도메인으로 redirect)
 developers.company.com
 ```

   ​

### 10. 기타

-  권한 관리(OAuth)는 2.0을 사용하자.
-  필요한 경우, SDK로 API를 보완하자.
-  API Facade Pattern을 API 설계에 고려해라.

   ​

## Kakao, Naver API

기존의 Open API는 어떻게 디자인되어 있는지 확인해보자.

   ​

### NAVER Open API

공식문서는 [https://developers.naver.com](https://developers.naver.com) 을 참조.

> 이전(2015년 쯤)에는 네이버에서 제공하는 API를 사용하기 위해 'API 키'라는 유니크한 텍스트 문자열을 발급받고, 이를 API 호출시 같이 API 게이트웨이 서버로 전송함으로써 인증된 사용자임을 입증했다. 새로운 개발자센터에서는 API 키 방식은 더 이상 사용하지 않고 애플리케이션마다 일종의 유니크한 아이디와 비밀번호(클라이언트 아이디, 시크릿)값을 이용해서 인증하고 있다.

   ​

### 1. API 호출 URL과 요청 변수

 - https://openapi.naver.com/버전/서비스구분/API 구분 형태

 - 예시) 기계번역 API : https://openapi.naver.com/v1/language/translate

 - 요청변수란, 오픈 API를 호출할 때 함께 서버로 전송해야 하는 값이다.

 - 요청변수에 한글이나 특수문자가 요청 변수값에 포함되어 있을 경우, 서버 전송 시 값이 깨지기 때문에 인코딩/디코딩 과정이 필요하다.

   ​

### 2. 에러 코드 정의

#### HTTP 상태 코드
- 400 (요청변수) : 필수 요청 변수가 빠졌거나 요청변수 이름이 잘못되었을 경우나 요청 변수 값을 URL 인코딩하지 않고 전송하였을 경우
- 401 (인증실패) : 애플리케이션 클라이언트 아이디와 시크릿 값이 없거나 잘못되었을 경우
- 401 (인증실패) : 클라이언트 아이디와 시크릿 값을 HTTP 헤더에 정확히 설정하지 않고 호출했을 경우
- 401 (인증실패) : API 권한 설정이 안되어 있을 경우
- 401 (인증오류) : 로그인 오픈 API를 호출할 때 접근 토큰(access_token) 값이 빠졌거나 잘못된 값 (기간 만료)을 설정하였을 경우
- 403 (호출금지) : https가 아닌 http로 호출하였을 경우
- 403 (호출금지) : 약관 동의를 하지 않고 호출할 경우 또는 권한이 없거나 비공개인 경우
- 404 (API없음) : API 요청 URL이 잘못되었을 경우
- 405 (메서드오류) : HTTP 메서드를 잘못하여 호출하였을 경우 (POST인데 GET으로 호출)
- 429 (한도초과) : 오픈 API를 호출할 때 일 허용량을 초과하였을 경우
- 500 (서버오류) : API 호출은 정상적으로 했지만, API 서버 유지보수나 시스템 오류로 인한 에러가 발생하였을 경우

   ​

## Kakao REST API (카카오톡, 카카오페이)

### 1. 먼저, 카카오 로그인 후에 사용자 토큰을 받아온다.

   ​

### 2. 사용자 토큰을 헤더에 담아 GET으로 요청한다.

```http
GET /v1/api/talk/profile HTTP/1.1
Host: kapi.kakao.com
Authorization: Bearer {access_token}
```

   ​

### 3. 응답은 JSON 형태로 다음과 같은 정보를 포함한다.

```json
{
 "nickName":"홍길동",
 "profileImageURL":"http://xxx.kakao.co.kr/.../aaa.jpg",
 "thumbnailURL":"http://xxx.kakao.co.kr/.../bbb.jpg",
 "countryISO":"KR"
}
```

   ​

### Response Code Example

```json
{
  "meta": {
    "code": 200,
    "response_time": {
      "time": 0,
      "measure": "seconds"
    }
  },
  "notifications": {},
  "response": {}
}
```

   ​

### Error Code Example

```json
{
  "meta": {
    "code": 500,
    "error_detail": "The user has not authorized this application or the token is invalid.",
    "error_type": "invalid_auth",
    "developer_friendly": "The user has not authorized this application or the token is invalid.",
    "response_time": {
      "time": 0,
      "measure": "seconds"
    }
  }
}
```

   ​

## 참고자료

- API Platform Design : [http://bcho.tistory.com/808](http://bcho.tistory.com/808)
- Web API Design : [https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf](https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf)
- 카카오 개발자센터 : [https://developers.kakao.com](https://developers.kakao.com)
- 네이버 개발자센터 : [https://developers.naver.com](https://developers.naver.com)

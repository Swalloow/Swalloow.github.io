+++
author = "Swalloow"
date = "2017-01-03"
draft = true
title = "윈도우 10에서 bash를 통해 Jekyll 블로그 간단하게 설치하기"
slug = "windows-bash-jekyll"
tags = ["windows","bash","jekyll","blog"]
image = ""
comments = true
share = false
menu = ""
+++

기존에 Windows 환경에서 Jekyll 블로그를 설치하는 글을 살펴보던 중 환경변수와 루비에 스트레스 받아서, 새로 포스팅하기로 마음 먹었습니다. (2017년 1월 2일 기준)

   ​

## 윈도우 10에서 Ruby 설치

1. `프로그램 및 기능 > Windows 기능 켜기/끄기 > Linux용 Windows 하위 시스템` 을 체크합니다.
2. 이후 cmd 창에서 `bash` 를 입력하시면 Windows Subsystem for Linux 환경이 실행됩니다.

처음 실행한다면, 아무것도 설치되지 않은 상태이기 때문에 초기 설정을 해주시면 좋습니다.

```
$ sudo -s
$ apt update
$ apt install make gcc
```

이제 루비를 설치해보겠습니다. 놀랍게도 윈도우 bash에서는 `apt install ruby` 를 통해 설치하려는 경우, 루비 1.9.3 버전만 설치됩니다 ! (rvm과 rbenv를 사용해봐도 동일) 하지만, Jekyll 에서 최소 2.0 이상의 버전을 요구하기 때문에 brightbox를 통해 최신 버전을 설치하였습니다.

```
$ apt-add-repository ppa:brightbox/ruby-ng
$ apt update
$ apt install ruby2.3 ruby2.3-dev ruby-switch
```

여기까지 설치되고 나면 뭔가 안심이 됩니다. 하지만 이제 시작에 불과합니다.

   ​

## Jekyll 설치하기

이제 설치하려는 경로로 이동해서 jekyll을 설치할 차례입니다. 여기에서는 바탕화면에 설치해보도록 하겠습니다.

```
$ gem install jekyll
$ cd /mnt/c/Users/<your username>/Desktop
$ jekyll new myblog && cd myblog
$ jekyll serve -w
```

속도를 측정해보면, Bash는 `0.329초`, PowerShell은 `0.364초` 로 Bash에서 실행시키는 것이 더 빠르다고 합니다. 여기까지가 아주 기본적인 형태의 jekyll 블로그 설치 과정입니다.

   ​

## 테마까지 한번에 적용하여 Jekyll 설치하기

기본 설치를 끝내면 그냥 빈 화면만 나타나기 때문에 허전합니다. 그래서 이번에는 테마까지 한번에 적용하여 설치하는 방법을 알려드리겠습니다. (방금꺼는 `gem uninstall -all` 명령어를 통해 삭제하셔도 됩니다)

1. 먼저, `<사용자이름>.github.io` 라는 이름의 Repository를 생성합니다.
2. 생성한 저장소를 로컬에 clone 하고 cd 명령어를 통해 위치로 이동합니다.
3. 마음에 드는 Jekyll 테마를 다운로드 받아 로컬에 압축해제 합니다. (http://jekyllthemes.org/)

   ​

구조를 처음 보시면 복잡한데, 우리가 건드릴 부분은 `_config.yml` 과 `Gemfile` 입니다. Gemfile은 GitHub Pages에 필요한 라이브러리를 설치하도록 정의한 파일이라고 보시면 됩니다.
데스크탑과 노트북 또는 맥북을 사용해보신 분은 아시겠지만, GitHub Pages에서 의존성 문제가 아주 빈번하게 발생합니다.

- 의존성을 가지는 라이브러리 참고 ([https://pages.github.com/versions/](https://pages.github.com/versions/))

   ​

위의 링크처럼 각 라이브러리마다 버전 정보를 따로 관리해도 되지만, `gem 'github-pages'` 를 통해 관리하는 방법이 가장 간편합니다.
이를 통해 github-pages의 최신 의존성 정보를 간단하게 업데이트할 수 있습니다.

```
$ vi Gemfile

source 'https://rubygems.org'
gem 'github-pages'
```

   ​

이제 bundler를 설치할 차례입니다. bundler는 라이브러리 설치를 위한 패키지 매니저입니다.

```
$ gem install bundler
$ bundle install
$ bundle update
```

이제 Gemfile에 있는 라이브러리를 설치하고 업데이트까지 완료했습니다.

의존성 정보를 확인하시려면 `github-pages versions` 명령어를 입력하시면 됩니다.

   ​

## 삽질 방지를 위한 오류 해결 과정

#### 1. jeykll 3.3.1 버전에서 오류 발생

최근 *Windows+Bash Subsystem*에서 powershell을 defalut cmd로 확장하는 과정에서 생겨난 버그

- (https://github.com/jekyll/jekyll/issues/5462 참조)

   ​

해결방법은 다음과 같습니다. 첫번째 방법은 번거롭기 때문에 두번째 방법을 추천합니다.

1. jeykll 3.3.1 버전을 삭제하고 3.2.1 버전으로 하향시키기

2. build.rb에서 코드 수정하기

   ​

build.rb의 위치를 찾는 방법

   ```
bundle show jekyll
   ```



그리고 `lib/jekyll/commands/build.rb`로 이동

```ruby
if Utils::Platforms.windows?를 unless Utils::Platforms.windows?로 수정
```

   ​

#### 2. jekyll serve에서 오류 발생


실행 명령어 `jekyll serve` 하면 여기서 끝날줄 알았는데!

또 오류 발생... (https://github.com/jekyll/jekyll/issues/5233 참조)

   ​

역시 마찬가지로 *Windows+Bash Subsystem* 버그라고 합니다..

`jekyll serve --force_polling`  옵션을 통해 해결하실 수 있습니다.

   ​

## 결론

쓰다보니 간단하지 않은 것 같지만 제가 삽질했던 부분을 빠르게 건너뛴다면,

윈도우 사용자도 금방 설치할 수 있습니다 (Bash on Windows 만세 !)

다만, 정신건강을 위해 맥을 사용하는걸 추천합니다.

   ​

#### 참고하면 좋은 페이지

- GitHub Help : https://help.github.com/articles/configuring-jekyll/
- https://nolboo.kim/blog/2013/10/15/free-blog-with-github-jekyll/#configyml
- http://my2kong.net/2016/07/07/jekyll-blogging-theme/
- Jekyll QuickStart : http://jekyllbootstrap.com/usage/jekyll-quick-start.html

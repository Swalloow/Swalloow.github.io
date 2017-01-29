---
layout: post
title: "Jupyter Notebook 다중커널 설정하기"
modified: 2017-01-28
tags: [jupyter notebook]
categories: [Develop]
---

Jupyer Notebook은 웹 기반의 대화형 노트북 지원으로 수식, 표, 그림 등을 표현하기 쉬운 개발 환경입니다.
코딩과 문서화(Markdown)까지 한 화면에서 가능하며 커널 확장을 통해 다양한 파이썬 버전 뿐만 아니라 여러 언어를 지원합니다.

이제 파이썬을 처음 설치한다고 가정하고 맥 OS에서 간단하게 jupyter 환경설정하는 방법을 소개해드리고자 합니다.

   ​

## pyenv 설치하기

### 1. Homebrew를 통해 pyenv를 설치

```shell
$ brew install pyenv
```

   ​

### 2. pyenv init을 ~/.bashrc에 추가 (zsh를 사용하는 경우 ~/.zshrc)

```shell
$ echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

   ​

### 3. pyenv 사용해보기

```shell
$ pyenv versions
system (set by /Users/USERNAME/.pyenv/version)
```

   ​

### 4. pyenv 명령어 정리

```shell
$ pyenv install <version>
$ pyenv uninstall <version>
$ pyenv install -list
$ pyenv shell <version>
$ pyenv activate <environment>
$ pyenv deactivate <environment>
```

   ​

## pyenv-virtualenv 설치하기

### 1. Homebrew를 통해 pyenv-virtualenv를 설치

``` shell
$ brew install pyenv-virtualenv
```

   ​

### 2. virtualenv init을 ~/.bashrc에 추가 (zsh를 사용하는 경우 ~/.zshrc)

```shell
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
```

   ​

### 2. pyenv-virtualenv 사용해보기

```shell
# pyenv virtualenv [python version] [myname]
$ pyenv virtualenv 2.7.11 python2
$ pyenv virtualenv 3.5.1 python3
```

   ​

### 2. virtualenv 명령어 정리

```shell
$ pyenv virtualenv versions
$ pyenv virtualenv [python version] [myname]
$ pyenv shell [myname]
```

   ​

## Jupyter Notebook 설치

이제 방금 설치했던 파이썬 2와 3 버전의 환경에 python, notebook, jupyter를 설치할 차례입니다.

따라서 방금 설치한 환경을 각각 activate한 다음에 아래와 같은 명령어를 실행시켜야 합니다.

   ​

### 1. pip install (python2, python3 각각 실행)

```shell
$ pip install ipython
$ pip install notebook
$ pip install jupyter
```

   ​

### 2. 초기 Jupyter configuration 파일 생성 (마찬가지로 각각 실행)

```shell
$ jupyter notebook --generate-config
Installed kernelspec python3 in /Users/username/Library/Jupyter/kernels/python3
```

   ​

### 3. 생성된 jupyter_notebook_config.py 설정 (원하는 경우에만 커스텀 설정)

```shell
$ vi /Users/username/Library/Jupyter/kernels/python3/jupyter_notebook_config.py

# jupyter_notebook_config.py
$ c.NotebookApp.ip = '*'
$ c.NotebookApp.open_browser = False
$ c.NotebookApp.port = 8888
$ c.NotebookApp.password = [SHA password]
```

   ​

### 4. ipykernel 설정 (마찬가지로 각각 실행)

```shell
$ pyenv shell python2
$ python -m ipykernel install --user
Installed kernelspec python2 in /home/seen/.local/share/jupyter/kernels/python2
```

   ​

### 5. kernel.json 확인 (원하는 경우에만 커스텀 설정)

```shell
$ vi /home/seen/.local/share/jupyter/kernels/python2/kernel.json
{
  "display_name": "Python 2",
  "language": "python",
  "argv": [
    "/home/seen/.pyenv/versions/py27/bin/python",
    "-m",
    "ipykernel",
    "-f",
    "{connection_file}"
    ]
  }
}
```

   ​

### 6. jupyter notebook을 실행

```shell
# 일반적인 경우
$ jupyter notebook

# background로 실행하고 싶은 경우
$ nohup jupyter notebook &

# background로 실행한 경우 프로세스 종료
$ ps -a
37788 ttys000 0:00:00 ...python (노트북을 실행한 프로세스)
$ kill 37788
```

   ​

## 정리

윈도우10 에서 아주 고생했던 환경설정이 맥 OS에서는 아주 간편하게 됩니다…

잘 안되거나 오류가 생기시면 댓글로 알려주시면 감사하겠습니다!

   ​

### 참고링크

- [https://github.com/yyuu/pyenv](https://github.com/yyuu/pyenv)
- [https://github.com/yyuu/pyenv-virtualenv](https://github.com/yyuu/pyenv-virtualenv)

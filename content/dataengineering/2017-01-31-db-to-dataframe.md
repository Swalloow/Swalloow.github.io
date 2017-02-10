+++
author = "Swalloow"
date = "2017-01-14"
draft = true
title = "DB 테이블을 Pandas DataFrame으로 읽어오는 방법"
slug = "db-to-dataframe"
tags = ["mysql","pandas","dataframe"]
image = ""
comments = true
share = false
menu = "main"
+++

   ​

본 포스팅에서는 예시를 MySQL로 들지만 sqlalchemy의 커넥터만 변경해주면,

MySQL 뿐만 아니라 모든 데이터베이스에 적용가능하다.

   ​

먼저 sqlalchemy가 설치되어 있지 않다면 설치해준다.

sqlalchemy와 mysql을 연결하는 패키지가 필요한데,

파이썬2를 사용한다면 `mysql-python`,

파이썬3을 사용한다면 `pymysql`을 설치해주면 된다.

```shell
# python2
$ pip install mysql-python
$ pip install sqlalchemy

# python3
$ pip install pymysql
$ pip install sqlalchemy
```

   ​

이제 sqlalchemy를 통해 DB에 연결해보자.

주소에서 root, password, table은 DB에 맞게 변경해야 한다.

```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('mysql://root:password@localhost/table', convert_unicode=True)
conn = engine.connect()
```

   ​

마지막으로 pandas를 통해 table을 읽어들일 차례다.

pandas의 read_sql 은 0.19 버전부터 생겨났으며, sqlalchemy를 필수로 사용하도록 되어 있다.

```python
data = pd.read_sql_table('table_name', conn)
data.head()
```

   ​

이게 전부이다. pandas는 강력하다...

   ​

## MySQL dump 파일을 읽어오는 방법

추가로 외부로부터 데이터를 넘겨받을 때 DB dump 파일 (.sql) 을 넘겨받는 경우가 있다.

데이터베이스 전체를 받은 dump 파일이라면, 커멘드에 다음과 같이 입력한다.

```shell
# root, database, data.sql은 알아서 수정
$ mysqldump -u root -p database > data.sql
```

   ​

특정 테이블만 받고 싶다면, 커멘드에 다음과 같이 입력한다.

```shell
# root, table, database, data.sql은 알아서 수정
$ mysqldump -u root -p database table > data.sql
```

   ​

위와 같은 과정이 끝나면, 나의 MySQL 계정에 데이터가 저장된 것을 확인할 수 있다.

이후에는 앞에서 설명한대로 pandas를 통해 DataFrame으로 변환하면 된다.

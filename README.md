# Mungmate Frontend
## github action
- ci 자동화를 구축해보고 싶어 사용하게 되었다. 평소 협업을 할 때 eslint/prettier를 세팅해놓고 웹스톰에서 저장시 자동으로 실행되게끔 사용했는데
- 이렇게 되면 다른 사람이 클론 받아서 작업하게 되면 세팅해놓은 ci가 적용 안 된채 remote repo로 들어오게 된다.
- 그래서 이번에는 github action을 이용해 ci의 자동화를 만들어보려고 한다.

### Event
- `on: push` 
- 깃허브에서 발생하는 대부분의 이ㅂ 
- job은 runner라는 vm에서 작동한다.
- shell script?


### branch 관리
- main(배포용)
- dev(개발용)
  - 기능 단위로 develop branch에서 작업해서 main으로 pr 보낸다

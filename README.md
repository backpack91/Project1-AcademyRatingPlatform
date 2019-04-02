# 원장님 귀는 당나귀 귀(Won-Dang-Gui)

## Introduction

**원장님 귀는 당나귀 귀** 는 학원 결제영수증 제출을 통해 실제 수강생임을 인증하여 익명으로 후기를 남길 수 있는 학원 후기 공유 플래폼 입니다.



## **Requirements**

- Facebook 가입이 선행되어야 합니다.
- Chrome Browser를 권장합니다.



## **Features**

- SignIn, SignUp, SignOut
- 학원 수강 영수증 제출/ 인증
- 학원 정보 등록
- 학원 상세 페이지
- 학원 상세 페이지 내 후기 등록



## **Installation**

**Client & Server**

```
git clone https://github.com/backpack91/Project1-AcademyRatingPlatform.git
cd Project1-AcademyRatingPlatform
npm install
npm start
```



## **Skills**

------

## **1.FrontEnd-Side**

- ###### Modern Javascript(ES2015+)

- React를 사용한 컴포넌트 기반의 구조

- Redux.js를 사용하여 Application state관리

- Sass를 사용한 Nesting Style CSS

- HTTP Client 라이브러리는 Promise 베이스의 axios사용

## **2.BackEnd-Side**

- Modern Javascript(ES2015+)
- Firebase Social Login
- JWT(JSON Web Token)을 이용하여 안정적이고 Stateless한 인증 시스템 구현
- Node.js
- Express.js
- Amazon Web Services S3를 사용하여 영수증이미지, 학원 profile저장
- mongoDB / mLab / mongoose 을 사용하여 users,  academies 자료 저장



### **Test**

- Jest와 Enzyme을 이용하여 Reducer및 Component 단위 테스트 구현



### **Version Control And Collaboration**

- Git과 Github을 사용하여 빠르고 효과적으로 Version Control
- Trello를 사용한 Schedule Sharing



## **Deployment**

- AWS Elastic Beanstalk(API SERVER)



### **Challenges**

- Amazon Web Services S3를 처음으로 사용하다보니 사용법을 익히고 사용하는 것이 쉽지 않았습니다.
- Server Side로직을 짜고 Client Side로직을 짜는 work flow를 따라서 프로젝트를 진행함에 있어 단계별로 차근차근 완성해 나가는것이 익숙치 않아 시간이 평소보다 더 할애된 점이 있습니다.
- 리덕스를 사용하여 application단위의 state를 관리함에 있어 어느 부분을 component단위 state로 관리하고 어떤 부분을 application 단위 state로 바라볼지에 대한 기준을 잡는것이 쉽지 않았습니다.



### **Things to do**

2주라는 기간을 정하고 시작한 프로젝트였기 때문에 핵심 기능 구현/완성을 목표로 잡았습니다. 이전에 부트캠프를 알아보던 과정에서 정보가 많지 않아 답답함을 느끼던중 떠오른 아이디어 였기 때문에 구현과정이 다른 어떤 프로젝트 보다 뿌듯했던 기억이 있습니다. 하지만 동시에 시간이 한정적이였기 때문에 구현하고 싶었던 모든 기능을 담지못한 아쉬움도 함께 남아있습니다.

 보완하고 싶은 점들은 아래와 같이 문서화 시켜 지속적으로 가꾸어 나가고자 합니다.

- 회원가입 추가정보 기입 기능
- 모바일에서 사용 가능한 반응형 대응
- 학원상세페이지 유저 후기중 학원평가 점수 종합해서 평균값 저장
- 학원 카테고리별 필터링 기능 추가



------

Special Thanks to [Ken Huh](https://github.com/ken123777 "ken huh")

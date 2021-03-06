# 원장님 귀는 당나귀 귀(Won-Dang-Gui)

## Introduction

**원장님 귀는 당나귀 귀**는 학원 결제 영수증 제출을 통해 실제 수강생임을 인증하여 익명으로 후기를 남길 수 있는 학원 후기 공유 플랫폼 입니다.


## **Requirements**

- Facebook 가입이 선행되어야 합니다.
- Chrome Browser를 권장합니다.



## **Features**

- SignIn, SignUp, SignOut
- 학원 수강 영수증 제출/ 인증
- 학원 정보 등록
- 학원 상세 페이지
- 학원 상세 페이지 내 후기 등록

(Sign in)
![](gif/wondanggui_signin.gif)

(Academy detail page)
![](gif/wondanggui_academyDetail.gif)

## **Installation**

**Client & Server**

```
git clone https://github.com/backpack91/Project1-AcademyRatingPlatform.git
cd Project1-AcademyRatingPlatform
npm install
npm start
```



## **Skills**

### **1.Frontend-Side**

- ###### Modern Javascript(ES2015+)

- React를 사용한 컴포넌트 기반의 구조

- Redux.js를 사용하여 Application State 관리

- Sass를 사용한 Nesting Style CSS

- HTTP Client 라이브러리는 Axios 사용

### **2.Backend-Side**

- Modern Javascript(ES2015+)
- Firebase Social Login
- JWT(JSON Web Token)을 이용하여 안정적이고 Stateless한 인증 시스템 구현
- Node.js
- Express.js
- AWS S3를 사용하여 영수증이미지, 학원 Profile저장
- MongoDB / M-Lab / Mongoose 을 사용하여 Users, Academies 자료 저장



### **Test**

- Jest와 Enzyme을 이용하여 Reducer 및 Component 단위 테스트 구현



### **Version Control**

- Git과 Github을 사용하여 빠르고 효과적으로 Version Control
- Trello를 사용한 Schedule Managing



## **Deployment**

- AWS Elastic Beanstalk(Api Sercer)



### **Challenges**

- AWS S3를 처음으로 사용하다 보니 사용법을 익히고 사용하는 것이 쉽지 않았습니다.
- Server Side 로직을 짜고 Client Side 로직을 짜는 work flow를 따라서 프로젝트를 진행함에 있어 단계별로 차근차근 완성해 나가는 것이 익숙지 않아 시간이 평소보다 더 할애된 점이 있습니다.
- 리덕스를 사용하여 Application 단위의 State를 관리함에 있어 어느 부분을 Component 단위 State로 관리하고 어떤 부분을 Application 단위 State로 바라볼지에 대한 기준을 잡는 것이 쉽지 않았습니다.



### **Things to do**

2주라는 기간을 정하고 시작한 프로젝트였기 때문에 핵심 기능 구현/완성을 목표로 잡았습니다. 이전에 부트캠프를 알아보던 과정에서 정보가 많지 않아 답답함을 느끼던 중 떠오른 아이디어였기 때문에 구현 과정이 다른 어떤 프로젝트 보다 뿌듯했던 기억이 있습니다. 하지만 동시에 시간이 한정적이었기 때문에 구현하고 싶었던 모든 기능을 담지 못한 아쉬움도 함께 남아있습니다.

보완하고 싶은 점들은 아래와 같이 문서화 시켜 지속적으로 가꾸어 나가고자 합니다.

- 회원가입 추가 정보 기입 기능
- 모바일에서 사용 가능한 반응형 대응
- 학원 상세페이지 유저 후기 중 학원 평가 점수 종합해서 평균값 저장
- 학원 카테고리별 필터링 기능 추가



------

Special Thanks to [Ken Huh](https://github.com/ken123777 "ken huh")

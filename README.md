<img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/2bf72f6d-99c2-48e1-aeb3-a805f6fbbe6f" width="150px" />

# 냉장고에 뭐있지?

<p>냉장고에 보관되어 있는 식재료들을 기록해 이를 기반으로 레시피를 찾아주는 웹사이트입니다.</p>
<p>레시피의 조리법 및 영양 성분을 확인할 수 있으며, 원하는 레시피명이나 재료명을 검색하여 정보를 얻을 수도 있습니다.</p>
<br/>

## 🔍 주요 기능
- 나의 냉장고에 식재료를 입력해 보관된 재료를 전부 포함해서 만들 수 있는 레시피를 조회할 수 있습니다.
- 또는 처리하고 싶은 식재료 또는 하고 싶은 요리를 개별로 검색해 레시피의 영양성분과 조리 과정 등을 확인할 수 있습니다.
- 약 1100개 이상의 밥, 일품 요리, 국/찌개, 반찬, 후식 등의 레시피를 전체 조회할 수 있습니다.
- 맘에 드는 레시피를 저장해 차후 마이페이지에서 일괄 조회할 수 있습니다.
- 레시피 상세 페이지에서 사용자들과 댓글을 통해 소통할 수 있습니다.
</br>

## 🌐 페이지 소개

<table>
    <tr>
      <td align="center">메인</td>
      <td align="center">검색</td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/1615c55a-e427-404c-a8b9-0c9fe039d0cc" /></td>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/1827929e-996b-442c-9d52-6793ffce72e3" /></td>
    </tr>
    <tr>
      <td align="center">레시피</td>
      <td align="center">디테일</td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/72547e66-0be6-4f4a-9472-f992d4f60e55" /></td>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/ae473a43-a00c-4f8c-834b-fdb29c0600bd" /></td>
    </tr>
    <tr>
      <td align="center">마이페이지</td>
      <td align="center">관리자페이지</td>
    </tr>
    <tr>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/7ec19843-95c8-440c-9be4-f82b9fa4cac4" /></td>
      <td align="center"><img src="https://github.com/kimwonjuun/todays_recipe/assets/117059038/52361a75-928e-4df2-b34d-92e69d5bd574" /></td>
    </tr>
 </table>
</br>

## 🔥 구현 기능

#### 로그인/회원가입
- 실시간 유효성 검사를 통한 로그인, 회원가입
- 비밀번호 분실 시 재설정 기능

#### 메인
- 검색을 통한 레시피 조회
- 검색창 유효성 검사

#### 서치
- 검색을 통한 레시피 조회
- 검색창 유효성 검사
- 각 레시피 상세 페이지로 이동

#### 레시피
- 나의 냉장고, 전체 레시피 등 분류 필터링에 따른 레시피 조회
- 저칼로리 순, 가나다 순 등 소팅에 따른 레시피 조회
- 각 레시피 상세 페이지로 이동

#### 디테일
- 각 레시피 성분, 재료, 조리 순서 등 조회
- 레시피 찜 기능
- 댓글 작성, 조회, 수정, 삭제 기능

#### 마이페이지
- 프로필 사진, 닉네임 수정 기능
- 회원 탈퇴 기능
- 나의 냉장고 기능: 처리하고 싶은 식재료 기록 및 레시피 페이지 필터링을 통한 레시피 조회
- 찜한 레시피 조회

#### 관리자페이지
- 개발팀만 접근 가능
- Firestore에 가공한 레시피 데이터 업로드
- 데이터 수정 내역 입력 및 조회
</br>

## 💻 기술 스택

#### Environment
<div>
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

#### Client
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
</div>

#### Baas
<div>
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
</div>

#### Deploy
<div>
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>
</br>

## 📂 src 폴더 구조
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┣ 📂common
 ┃ ┣ 📂detail
 ┃ ┣ 📂error
 ┃ ┣ 📂layout
 ┃ ┗ 📂my
 ┣ 📂components
 ┃ ┣ 📂admin
 ┃ ┣ 📂auth
 ┃ ┣ 📂common
 ┃ ┣ 📂detail
 ┃ ┣ 📂layout
 ┃ ┣ 📂my
 ┃ ┗ 📂recipe
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📜Admin.tsx
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜My.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┣ 📜Recipe.tsx
 ┃ ┗ 📜Search.tsx
 ┣ 📂recoil
 ┣ 📂routes
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```
- **api**: api 관련 파일
- **assets**: 로고 및 이미지 파일
- **components**: 각 페이지에서 생성된 컴포넌트 파일 / common: 2회 이상 재사용되는 공용 컴포넌트 파일
- **hooks**: 커스텀 훅 파일
- **pages**: 각 페이지 파일
- **recoil**: 리코일 관련 파일
- **routes**: 라우터 관련 파일
- **styles**: 전역 스타일 관련 파일
- **types**: 2회 이상 재사용되는 전역 타입 관련 파일
- **utils**: 기타 특정 작업 수행하는 함수 파일
</br>

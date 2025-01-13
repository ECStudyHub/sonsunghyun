# 고양이 사진첩 애플리케이션
* 링크: https://school.programmers.co.kr/skill_check_assignments/100
* 문제: 디렉토리 구조를 따라 탐색할 수 있는 사진첩 애플리케이션
* 실행방식: VS Code 익스텐션의 Live Server로 index.html 실행

## 코드 역할 설명
* Breadcrumb.js: 현재 탐색중인 경로를 렌더링
* Nodes.js: 폴더 및 파일 목록을 렌더링
* ImageView.js: 파일 클릭시 이미지를 렌더링
* Loading.js: 데이터 로딩 중인 화면을 렌더링(skeleton ui)
* App.js: 어플리케이션의 필요한 컴포넌트의 상태를 업데이트하는 역할 및 이벤트 리스너 정의
* api.js: 사진첩의 파일과 디렉토리를 가져오는 서비스 

## 구현 사항
### 필수 구현사항
1. 현재 탐색 중인 경로를 렌더링
2. 현재 탐색 중이 파일/디렉토리 렌더링
3. 파일을 클릭한 경우 Modal 띄우는 기능
### 옵션 구현사항
1. Breadcrumb 클릭하면 특정 디렉토리로 이동 기능
2. 파일(Modal)이 열린 상태에서 ESC 클릭하면 파일이 닫히닌 기능 
3. 데이터 로딩 중에 skeleton ui 처리
4. 로딩된 데이터 캐싱하여 http 요청 방지

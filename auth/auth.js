// 화면 로딩 시 실행
// document.addEventListener("DOMContentLoaded", () => {
//   const storedNickname = localStorage.getItem("nickname");
//   updateUIWithLoginStatus(storedNickname); // login.js에서 정의된 함수를 호출
// });

//로그인 상태 확인
// 기본 로그인/회원가입시 쿠키 생성
function getCookie(name) {
  //웹 브라우저에서 현재 페이지의 쿠키 정보 가져옴 -> 로그인 되어 있어야 쿠키값 존재
  let matches = document.cookie.match(
    //매칭되는 쿠키 값을 찾기 위한 패턴 생성
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );

  //배열의2번째 요소에 있는 쿠키 값 디코드해서 반환 or 빈값 반환
  return matches ? decodeURIComponent(matches[1]) : undefined; // 틀은 있지만 값은 없는 상태
}
//배포
function isLocalhost() {
  return ["localhost", "127.0.0.1"].includes(location.hostname);
}
function apiUrl() {
  return `${isLocalhost() ? "http" : "https"}://${isLocalhost() ? "${location.hostname}:8080/api" : location.hostname}`;
}

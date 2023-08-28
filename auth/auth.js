// 기본 로그인/회원가입시 쿠키 생성
function getCookie(name) {
  //웹 브라우저에서 현재 페이지의 쿠키 정보 가져옴 -> 로그인 되어 있어야 쿠키값 존재
  let matches = document.cookie.match(
    //매칭되는 쿠키 값을 찾기 위한 패턴 생성
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );

  //배열의2번째 요소에 있는 쿠키 값 디코드해서 반환 or 빈값 반환
  return matches ? decodeURIComponent(matches[1]) : undefined; // 틀은 있지만 값은 없는 상태
}

// 인증토큰이 없으면 로그인페이지로 튕김
// (() => {
//   const token = getCookie("token");
//   console.log(token);
//   if (!token) {
//     alert("로그인이 필요한 기능 입니다.");
//     // 페이지를 이동시키는 window.location 객체의 속성
//     window.location.href = "index.html";
//   }
// })();

// // 개인정보 없이 로그인 상태 확인-> buttun display
// //2. 상태 확인
// function checkLoginStatus() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   return isLoggedIn === "true";
// }
// //1. 상태 설정
// function setLoggedInStatus(isLoggedIn) {
//   localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
//   updateButtonVisibility();
// }
// //3. 상태에 따른 display
// function updateButtonVisibility() {
//   const isLoggedIn = checkLoginStatus();
//   const btnIn = document.querySelector(".btn-in");
//   const btnOut = document.querySelector(".btn-out");
//   const btnUp = document.querySelector(".btn-up");
//   const nickname = document.querySelector(".btn-nickname");

//   //로그인 중
//   if (isLoggedIn) {
//     btnIn.style.display = "none";
//     btnUp.style.display = "none";
//     btnOut.style.display = "flex";
//     nickname.style.display = "flex";
//   } else {
//     btnIn.style.display = "flex";
//     btnUp.style.display = "flex";
//     btnOut.style.display = "none";
//     nickname.style.display = "none";
//   }
// }
// // 웹 페이지 로딩 시 자동으로 버튼 상태 업데이트
// updateButtonVisibility();

// // URL에서 err 파라미터 값 추출
// const urlParams = new URLSearchParams(window.location.search);
// const errMessage = urlParams.get("err");

// // err 파라미터가 Conflict일 경우에만 alert 창 띄우기
// if (errMessage === "Conflict") {
//   alert("로그인 정보가 잘못 되었습니다. 다시 로그인 해주세요");
// }

// // 리디렉션을 원하는 페이지로 이동
// window.location.href = "/index.html";

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

// 개인정보 없이 로그인 상태 확인-> buttun display
//2. 상태 확인
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}
//1. 상태 설정
function setLoggedInStatus(isLoggedIn) {
  localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  updateButtonVisibility();
}
//3. 상태에 따른 display
function updateButtonVisibility() {
  const isLoggedIn = checkLoginStatus();
  const btnIn = document.querySelector(".btn-in");
  const btnOut = document.querySelector(".btn-out");
  const btnUp = document.querySelector(".btn-up");
  const nickname = document.querySelector(".btn-nickname");

  if (isLoggedIn) {
    btnIn.style.display = "flex";
    btnUp.style.display = "flex";
    btnOut.style.display = "none";
    nickname.style.display = "none";
  } else {
    btnIn.style.display = "none";
    btnUp.style.display = "none";
    btnOut.style.display = "flex";
    nickname.style.display = "flex";
  }
}

// 웹 페이지 로딩 시 자동으로 버튼 상태 업데이트
updateButtonVisibility();

// //로그인 토큰 여부 확인 함수
// function isLoggedIn() {
//   const token = getCookie("token");
//   console.log(token);
//   return token !== undefined && token !== null && token !== "";
// }

// // 인증토큰이 없으면 로그인페이지로 튕김
// if (!isLoggedIn()) {
//   window.location.href = "/login.html";
// }

// // 로그인 여부에 따른 헤더 화면 구성
// document.addEventListener("DOMContentLoaded", () => {
//   const login = document.getElementById("btn-login");
//   const up = document.getElementById("btn-signup");
//   const users = document.getElementById("userMenu");

//   //header:로그인
//   if (isLoggedIn) {
//     login.style.display = "none";
//     up.style.display = "none";
//     users.style.display = "block";
//   } else {
//     // hearder: 로그아웃
//     login.style.display = "block";
//     up.style.display = "block";
//     users.style.display = "none";
//   }
// });

// // 로그아웃
// const out = document.getElementById("btn-logout");

// out.addEventListener("click", () => {
//   //  토큰 제거
//   localStorage.removeItem("token");
//   // 화면 갱신
//   window.location.reload();
// });

// 회원가입된 정보와 일치 시 로그인
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//로그인 토큰 여부 확인 함수
function isLoggedIn() {
  const token = getCookie("token");
  console.log(token);
  return token !== undefined && token !== null && token !== "";
}

// 인증토큰이 없으면 로그인페이지로 튕김
if (!isLoggedIn) {
  window.location.href = "/login.html";
}

// 로그인 여부에 따른 헤더 화면 구성
document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("btn-login");
  const up = document.getElementById("btn-signup");
  const users = document.getElementById("userMenu");

  //header:로그인
  if (isLoggedIn) {
    login.style.display = "none";
    signup.style.display = "none";
    users.style.display = "block";
  } else {
    // hearder: 로그아웃
    login.style.display = "block";
    signup.style.display = "block";
    users.style.display = "none";
  }
});

// 로그아웃
const out = document.getElementById("btn-logout");

out.addEventListener("click", () => {
  //  토큰 제거
  localStorage.removeItem("token");
  // 화면 갱신
  window.location.reload();
});

// 회원가입

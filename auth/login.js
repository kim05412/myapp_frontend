document.addEventListener("DOMContentLoaded", function () {
  // UI 업데이트 함수 실행
  updateButton();
  // 로컬 호스트 여부와 API URL 확인
  function apiUrl() {
    return `${isLocalhost() ? "http://" : "https://"}${isLocalhost() ? `${location.hostname}:8080/api` : `${location.hostname}/api`}`;
  }
  function isLocalhost() {
    return ["localhost", "127.0.0.1"].includes(location.hostname);
  }
  // 리다이렉트 URL 가져오는 함수
  function getRedirectUrl() {
    return isLocalhost() ? "http://localhost:5502" : "https://d1f3g0hpji6oor.cloudfront.net/";
  }

  // 로그인 함수
  async function login(event) {
    event.preventDefault();
    const form = event.target;
    const userId = form.userId.value;
    const password = form.password.value;

    try {
      const loginUrl = `${apiUrl()}/auth/signin`; // 로그인 API URL
      console.log("Sending login request:", { userId, password });
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.nickname);
        updateButton();
        // 성공 시에만 리다이렉트
        window.location.href = getRedirectUrl();
      } else {
        alert("로그인 실패: " + data.message);
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  }

  // 로그아웃 함수
  async function logout(event) {
    event.preventDefault();

    try {
      const loginUrl = `${apiUrl()}/auth/signin`; // 수정된 부분: 로그인 API URL
      console.log("Sending login request:", { userId, password });
      const response = await fetch(loginUrl, {
        // 수정된 부분: loginUrl 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nickname", data.nickname);
        updateButton();
        window.location.href = redirectUrl;
      } else {
        alert("로그인 실패: " + data.message);
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
    }
  }

  // 로그인 상태에 따라 버튼 업데이트
  function updateButton() {
    const loginForm = document.getElementById("form-login");
    const signUpButton = document.getElementById("btn-up");
    const nicknameButton = document.getElementById("btn-nickname");
    const logoutButton = document.getElementById("btn-out");
    const token = localStorage.getItem("token");

    if (token) {
      // 로그인 상태인 경우
      loginForm.style.display = "none"; // 로그인 폼 숨기기
      signUpButton.style.display = "none"; // 회원가입 버튼 숨기기
      nicknameButton.style.display = "block"; // 닉네임 버튼 표시
      logoutButton.style.display = "block"; // 로그아웃 버튼 표시
      nicknameButton.querySelector("a").textContent = `${localStorage.getItem("nickname")}님`; // 닉네임 설정
    } else {
      // 로그아웃 상태인 경우
      loginForm.style.display = "flex"; // 로그인 폼 표시
      signUpButton.style.display = "block"; // 회원가입 버튼 표시
      nicknameButton.style.display = "none"; // 닉네임 버튼 숨기기
      logoutButton.style.display = "none"; // 로그아웃 버튼 숨기기
    }
  }
});

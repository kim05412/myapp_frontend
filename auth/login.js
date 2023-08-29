const loginForm = document.getElementById("form-login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // 폼 데이터 가져오기
  const formData = new FormData(loginForm);
  // 서버로 요청 보내기
  try {
    const response = await fetch(loginForm.action, {
      method: "POST",
      body: formData,
    });

    // 응답 처리
    if (response.ok) {
      const responseData = await response.json();
      const nickname = responseData.nickname;
      alert("${nickname}님! 오늘도 ProEatsNearby와 함께 즐거운 식사 되세요!");
      window.location.replace("http://localhost:5500");
    } else {
      alert("로그인 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error", error);
    alert("로그인 중 오류가 발생했습니다.");
  }
});

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
//   const btnIn = document.querySelector("#btn-in");
//   const btnOut = document.querySelector("#btn-out");
//   const btnUp = document.querySelector("#btn-up");
//   const nickname = document.querySelector("#btn-nickname");

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
// 웹 페이지 로딩 시 자동으로 버튼 상태 업데이트
updateButtonVisibility();

// // 로그아웃
// const logoutButton = document.getElementById("#btn-out");

// logoutButton.addEventListener("click", async () => {
//   try {
//     const response = await fetch("http://localhost:8080/auth/logout", {
//       method: "POST",
//       credentials: "include", // 쿠키를 함께 보내기 위해 필요
//     });

//     if (response.ok) {
//       alert("로그아웃되었습니다.");
//       window.location.replace("http://localhost:5500");
//     } else {
//       alert("로그아웃 중 오류가 발생했습니다.");
//     }
//   } catch (error) {
//     console.error("Error sending logout request:", error);
//     alert("로그아웃 중 오류가 발생했습니다.");
//   }
// });

// function hiddenButton(){
//   const token = getCookie("token");
//   const aside = document.querySelector("aside");
//   const buttons = aside.querySelectorAll("button");
//   if(!token){
//     buttons[0].hidden = true;
//     buttons[1].hidden = true;
//     buttons[3].hidden = true;
//   } else{
//     buttons[2].hidden = true;
//   }
// }

function loginLogout() {
  const divs = document.querySelectorAll("div");
  const buttons = divs[1].querySelectorAll("button");

  buttons[0].addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:5500/auth/login.html");
  });
  buttons[1].addEventListener("click", async (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.replace("http://localhost:5500/index.html");
    // try {
    //   // 서버로 로그아웃 요청 보내기
    //   const response = await fetch("http://localhost:8080/auth/logout", {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${getCookie("token")}`,
    //     },
    //   });

    //   if (response.ok) {
    //     // 세션 정보 삭제
    //     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //     window.location.replace("http://localhost:5500/index.html");
    //   } else {
    //     console.error("로그아웃 실패");
    //   }
    // } catch (error) {
    //   console.error("에러 발생:", error);
    // }
  });
}

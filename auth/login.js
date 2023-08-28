const loginForm = document.getElementById("form-login");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  try {
    const response = await fetch(loginForm.action, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // 로그인 성공 시 메시지 표시
      alert("닉네임님! 오늘도 ProEatsNearby와 함께 즐거운 식사 되세요!");
    } else {
      // 로그인 실패 시 메시지 표시
      alert("로그인실패.");
    }
  } catch (error) {
    console.error("Error:", error);
    // 에러가 발생한 경우 메시지 표시
    alert("로그인을");
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

//

/* <script>
        const loginForm = document.getElementById("form-login");

        loginForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          const formData = new FormData(loginForm);

          try {
            const response = await fetch(loginForm.action, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              // 로그인 성공 시 메시지 표시
              alert(
                "닉네임님! 오늘도 ProEatsNearby와 함께 즐거운 식사 되세요!"
              );
            } else {
              // 로그인 실패 시 메시지 표시
              alert("로그인실패.");
            }
          } catch (error) {
            console.error("Error:", error);
            // 에러가 발생한 경우 메시지 표시
            alert("로그인을");
          }
        });

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

          //로그인 중
          if (isLoggedIn) {
            btnIn.style.display = "none";
            btnUp.style.display = "none";
            btnOut.style.display = "flex";
            nickname.style.display = "flex";
          } else {
            btnIn.style.display = "flex";
            btnUp.style.display = "flex";
            btnOut.style.display = "none";
            nickname.style.display = "none";
          }
        }
        // 웹 페이지 로딩 시 자동으로 버튼 상태 업데이트
        updateButtonVisibility();

        // URL에서 err 파라미터 값 추출
        const urlParams = new URLSearchParams(window.location.search);
        const errMessage = urlParams.get("err");

        // err 파라미터가 Conflict일 경우에만 alert 창 띄우기
        if (errMessage === "Conflict") {
          alert("로그인 정보가 잘못 되었습니다. 다시 로그인 해주세요");
        }

        // 리디렉션을 원하는 페이지로 이동
        window.location.href = "/index.html";
      </script>
    </header>
    <script src="sidebar.js"></script>
    <script src="search.js"></script>
    <script src="index.js"></script>
  </body> */

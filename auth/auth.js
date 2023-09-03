// 화면 로딩 시 실행
document.addEventListener("DOMContentLoaded", () => {
  hiddenButton();
});

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

// // 로그인
// if (response.ok) {
//   // 성공 처리
//   const responseData = await response.json();
//   const nickname = responseData.nickname;
//   alert(`${nickname}` + "님! 오늘도 즐거운 식사 되세요!");
// } else {
//   // 실패 처리
//   alert("로그인 중 오류가 발생했습니다.");
// }
(() => {
  const form = document.getElementById("form-login");
  const button = document.getElementById("btn-in");

  button.addEventListener("click", async (e) => {
    e.preventDefault(); // 기본 동작 방지

    const inputs = form.querySelectorAll("input");
    const userId = inputs[0].value;
    const password = inputs[1].value;

    const formData = new FormData(); // FormData 생성
    formData.append("userId", userId);
    formData.append("password", password);

    const response = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // 성공 처리
      const responseData = await response.json();
      const nickname = responseData.nickname;
      alert(`${nickname}` + "님! 오늘도 즐거운 식사 되세요!");
      window.location.replace("http://localhost:5502"); // 로그인 성공 후 리다이렉트
    } else {
      // 실패 처리
      alert("로그인 중 오류가 발생했습니다.");
    }
  });
})();

function hiddenButton() {
  const token = getCookie("token");
  const btnIn = document.getElementById("btn-in");
  const btnOut = document.getElementById("btn-out");
  const btnUp = document.getElementById("btn-up");
  const nicknameElement = document.getElementById("btn-nickname");
  const inputs = document.querySelectorAll(".input");

  if (!token) {
    btnIn.style.display = "flex";
    btnUp.style.display = "flex";
    btnOut.style.display = "none";
    nicknameElement.style.display = "none";
    inputs.forEach((input) => {
      input.style.display = "block";
    });
  } else {
    btnIn.style.display = "none";
    btnUp.style.display = "none";
    inputs.forEach((input) => {
      input.style.display = "none";
    });
    btnOut.style.display = "flex";

    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      nicknameElement.style.display = "block"; // 이름을 표시할 때 보이도록 설정
      nicknameElement.textContent = `${storedNickname}` + "님";
      // 클릭 이벤트 추가
      nicknameElement.addEventListener("click", function () {
        // 이동할 페이지 URL을 여기에 입력하세요
        const targetPageURL = "http://192.168.100.94:5502/user/mypage.html";
        window.location.href = targetPageURL;
      });
    } else {
      nicknameElement.style.display = "none";
    }
  }
}

const btnOut = document.getElementById("btn-out");

btnOut.addEventListener("submit", async () => {
  try {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.status === "success") {
        alert(responseData.message);

        // 로그아웃 성공한 경우 토큰 및 닉네임을 로컬 스토리지에서 제거
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");

        // 로그아웃 성공 메시지 출력 후 로그인 페이지로 리디렉션
        window.location.replace("http://localhost:5500");
      } else {
        alert("로그아웃 실패");
      }
    } else {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
});

// 화면 로딩 시 실행
document.addEventListener("DOMContentLoaded", () => {
  hiddenButton();
});

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
    } else {
      nicknameElement.style.display = "none";
    }
  }
}

//로그아웃
const logoutButton = document.getElementById("btn-out");
logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const storedToken = localStorage.getItem("token");

  // 서버로 보낼 JSON 데이터 생성
  const requestData = {
    token: storedToken,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(requestData), // JSON 데이터를 문자열로 변환하여 요청 본문에 추가
    });

    if (response.ok) {
      // 서버에서 로그아웃 성공적으로 처리되면 클라이언트도 로그아웃 처리
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      alert("로그아웃 되었습니다.");
      window.location.replace("http://localhost:5500");
    } else {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error", error);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
});

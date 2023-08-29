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

    // 응답 처리 ([302].includes(response.status))
    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      const nickname = responseData.nickname;
      // 토큰과 닉네임을 로컬 스토리지에 저장
      localStorage.setItem("token", token);
      localStorage.setItem("nickname", nickname);

      alert(
        `${nickname}` + "님! 오늘도 ProEatsNearby와 함께 즐거운 식사 되세요!"
      );
      window.location.replace("http://localhost:5500");
    } else {
      alert("로그인 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error", error);
    alert("로그인 중 오류가 발생했습니다.");
  }
});

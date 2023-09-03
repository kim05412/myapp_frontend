(() => {
    const form = document.getElementById("form-login");
    const button = document.getElementById("btn-in");

    // 회원 가입 버튼 클릭 이벤트 리스너
    button.addEventListener("click", async (e) => {
      e.preventDefault(); // 기본 동작 방지

      const inputs = form.querySelectorAll("input");
      const userId = inputs[0].value;
      const password = inputs[1].value;

      const formData = new FormData(); // FormData 생성
      formData.append("userId", userId);
      formData.append("password", password);

      try {
        const response = await fetch("http://localhost:8080/auth/signin", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // 성공 처리
          const responseData = await response.json();
          const nickname = responseData.nickname;
          alert(`${nickname}` + "님! 오늘도 즐거운 식사 되세요!");
          window.location.replace("http://localhost:5502); // 로그인 성공 후 리다이렉트
        } else {
          // 실패 처리
          alert("로그인 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    });
  })();
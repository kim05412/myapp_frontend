(() => {
  const form = document.forms[0];
  const inputs = form.querySelectorAll("input");

  const userId = inputs[0];
  const password = inputs[1];
  const nickname = inputs[2];
  const year = inputs[3];
  const companyName = inputs[4];
  const companyAddress = inputs[5];
  const file = inputs[6]; // input type="file"

  const add = form.querySelector("button");

  add.addEventListener("click", async (e) => {
    e.preventDefault();

    // 필수 입력 체크
    let hasEmptyValue = false;

    inputs.forEach((input) => {
      if (!input.value) {
        hasEmptyValue = true;
      }
    });

    if (hasEmptyValue) {
      alert("모든 필수 입력값을 작성해주세요.");
      return; // 전송 중지
    }

    // // 파일이 선택되었는지 확인
    // if (!file.files[0]) {
    //   alert("파일을 선택해주세요.");
    //   return;
    // }

    async function sendData(fileDataString) {
      // 서버에 데이터 전송
      const response = await fetch("http://localhost:8080/auth/signup", {
        // 상대 경로로 수정
        // HTTP Method
        method: "POST",
        // 보낼 데이터 형식은 json
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.value,
          password: password.value,
          nickname: nickname.value,
          year: year.value, // 정수로 변환된 값 사용
          companyName: companyName.value,
          companyAddress: companyAddress.value,
          fileDataString: fileDataString ? fileDataString : null,
        }),
      });
    }

    // 파일이 선택되었는지 확인
    if (file.files[0]) {
      // 파일 리더 이벤트 핸들러 설정
      const reader = new FileReader();
      reader.addEventListener("load", async (e) => {
        const fileDataString = e.target.result.split(",")[1]; // 실제 데이터 추출;
        sendData(fileDataString);
      });
      reader.readAsDataURL(file.files[0]);
      alert("회원가입이 완료되었습니다.");
      window.location.href = `http://localhost:5502`;
    }
  });
})();

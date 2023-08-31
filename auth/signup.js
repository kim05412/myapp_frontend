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

    async function sendData(image) {
      console.log(userId.value);
      // 서버에 데이터 전송
      const response = await fetch("http://localhost:8080/auth/signup", {
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
          year: year.value,
          companyName: companyName.value,
          companyAddress: companyAddress.value,
          file: file.value,
        }),
      });
      console.log(response);
      // 응답에 따른
      const result = await response.json();
      console.log(result);
      const nickname = result.nickname;

      if (response.ok) {
        alert(`${nickname}` + "회원 가입 성공");
        window.location.replace("http://localhost:5502");
      } else {
        alert("회원가입 실패");
      }
    }
    if (file.files[0]) {
      // 파일이 있을 때
      const reader = new FileReader();
      // reader로 파일을 읽기가 완료되면 실행되면 이벤트 핸들러 함수
      reader.addEventListener("load", async (e) => {
        console.log(e);
        // file -> base64 data-url
        const image = e.target.result;
        sendData(image);
      });
      // 파일을 dataURL(base64)로 읽음
      reader.readAsDataURL(file.files[0]);
    } else {
      // 파일이 없을 때
      sendData();
    }
  });
})();

//작성시 로그인
(() => {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "http://localhost:5502";
    alert("포스팅을 작성하기 위해서는 로그인이 필요합니다.");
  }
})();

(() => {
  const form = document.querySelector(".write");
  console.log(form);
  const inputs = form.querySelectorAll("input");
  const buttons = document.forms[1].querySelectorAll("button");
  console.log(buttons);
  const btnAdd = buttons[0];
  //  const btnSave = buttons[1];

  const selected = form.querySelector(".menu-type");
  // const add = form.querySelector("btn-sumbit");
  const title = inputs[0];
  const menu = inputs[1];
  const address = inputs[3];
  const review = inputs[4];
  // const file = form.querySelector(".fileInput");
  const file = inputs[2];
  console.log(file);

  btnAdd.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(e.target);
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

    // 서버로 JSON 데이터 전송
    async function sendData(fileDataString) {
      try {
        const response = await fetch("http://localhost:8080/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            selected: selected.value,
            image: fileDataString ? fileDataString : null,
            title: title.value,
            menu: menu.value,
            address: address.value,
            review: review.value,
          }),
        });
        console.log(response);
        if (response.ok) {
          alert("작성완료");
          window.location.href = `http://localhost:5502`;
        } else {
          // 서버 응답이 실패인 경우
          alert("작성 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("Error", error);
        alert("작성 중 오류 발생");
      }
    }

    // 파일이 선택되었는지 확인
    if (file.files[0]) {
      // 파일 리더 이벤트 핸들러 설정
      const reader = new FileReader();
      reader.addEventListener("load", async (e) => {
        const fileDataString = e.target.result; // 실제 데이터 추출;
        sendData(fileDataString);
      });
      reader.readAsDataURL(file.files[0]);
      alert("작성이 완료되었습니다.");
      window.location.href = `http://localhost:5502`;
    }
  });
})();

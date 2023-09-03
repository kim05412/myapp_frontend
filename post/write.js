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
  const inputs = form.querySelectorAll("input");

  const select = form.querySelector("select");
  const add = form.getElementById("btn-submit");
  const title = inputs[0];
  const menu = inputs[1];
  const address = inputs[2];
  const reviewTextarea = inputs[3];
  const file = inputs[4];

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

    // 서버로 JSON 데이터 전송
    async function sendData(fileDataString) {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify({
          select: select,
          fileDataString: fileDataString ? fileDataString : null,
          title: title.value,
          menu: menu.value,
          address: address.value,
          review: reviewTextarea.value,
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
      alert("작성이 완료되었습니다.");
      window.location.href = `http://localhost:5502`;
    }
  });
})();

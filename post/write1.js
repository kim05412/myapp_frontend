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

  const add = form.getElementById("btn-submit");
  const title = inputs[0];
  const menu = inputs[1];
  const address = inputs[2];
  const reviewTextarea = inputs[3];
  const file = inputs[4];

  add.addEventListener("click", async (e) => {
    e.preventDefault();
    const selectedOptions = Array.from(form.querySelectorAll("select.menu-type")).map((select) => select.value);
    const loadedFiles = Array.from(file.files);
    const imageDataArray = [];

    for (const loadedFile of loadedFiles) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileDataString = event.target.result.split(",")[1]; // 이미지를 문자열로 변환
        imageDataArray.push(fileDataString);
      };

      reader.readAsDataURL(loadedFile);
    }

    // 이미지 데이터를 서버로 전송 또는 처리
    sendData(imageDataArray);
  });

  // 서버로 JSON 데이터 전송
  async function sendData(imageDataArray) {
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({
        selectedOptions: selectedOptions,
        fileDataArray: imageDataArray,
        title: title.value,
        menu: menu.value,
        address: address.value,
        review: reviewTextarea.value,
      }),
    });

    if (response.ok) {
      alert("작성이 완료되었습니다.");
      window.location.href = `http://localhost:5502`;
    } else {
      alert("작성 중 오류가 발생했습니다.");
    }
  }
})();

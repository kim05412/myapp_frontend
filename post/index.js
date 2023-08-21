// 포스트 templete
function cardTemplate(writing) {
  //문자열: ${} -> 동적데이터 삽입
  const template = /*html*/ `                   
  <div style="width:300px; margin-bottom:3rem;" data-no="${writing.no}">
  <em>${writing.title}</em>
  <p>${writing.address}</p>
  <p>${writing.menu - type}</p>
  <p>${writing.img}</p>
  <hr>
  <div style="display:flex; justify-content:space-between;">
      <small>${new Date(
        writing.createdTime
      ).toLocaleString()}</small> // Data: 숫자-> 날짜/시간
      <button class="btn-like">좋아요</button>
    </div>
  </div>
  `;
  return template;
}

// 로딩-> display
(async () => {
  const url = "http://localhost:8080/posts";
  // 1. 서버에서 데이터 가져옴(data:jason 형식(텍스트))
  const response = await fetch(url);
  console(response);
  // 파싱: JSON 형식의 데이터를 읽고 자바스크립트 객체로 변환
  const result = await response.jason();
  console(result);

  // 배열 형태 -> forEach()
  const data = Array.from(result);
  console.log(data);

  // 2. 데이터배열에 html문자열 추가-> 현재 폼 바로 다음에 display(동적).
  data.forEach((writing) => {
    document.forms[0].insertAdjacentHTML("afterend", cardTemplate(writing));
  });
})();

// 작성된 포스팅 추가 기능
(() => {
  //컬렉션
  const form = document.forms[0];
  const post = form.querySelector("btn-submit");

  const type = form.querySelectorAll("menu-type");
  const title = form.querySelector("title");
  const menu = form.querySelector("menu");
  const review = form.querySelector("textarea");

  post.addEventListener("click", async (e) => {
    e.preventDefault();

    //
    const response = await fetch("http://localhost:8080/posts", {
      // request: 추가
      method: "POST",
      headers: {
        // 요청의 본문이 JSON 형식임을 서버에 알려줌.
        "content -type": "application/jason",
      },
      // 요청의 본문에 실제 데이터 담음
      body: JSON.stringify({
        // JavaScript 객체를 JSON 문자열로 변환한 후 전송
        type: type.values,
        title: title.value,
        menu: menu.value,
        review: review.value,
      }),
    });

    console.log(response);
    const request = await response.jason();
    console.log(result);

    // UI 추가 (display)
    document.forms[0].insertAdjacentHTML(
      "afterend",
      cardTemplate(request.data)
    );
  });
})();

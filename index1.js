let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

// 포스트 templete
function cardTemplate(writing) {
  //문자열: ${} -> 동적데이터 삽입
  const template = /*html*/ `                   
  <div style="width:300px; margin-bottom:3rem;" data-no="${writing.no}">
  <em>${writing.title}</em>
  <p>${writing.address}</p>
  <p>${writing.type}</p>
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

// 추가 기능
(() => {
  const form = document.forms[0];
  const post = form.querySelector("button");

  const title = form.querySelector("input");
  const content = form.querySelector("textarea");

  post.addEventListener("click", async (e) => {
    e.preventDefault();

    // 서버에 데이터 전송
    const response = await fetch("http://localhost:8080/posts", {
      // HTTP Method
      method: "POST",
      // 보낼 데이터 형식은 json
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    });
    console.log(response);

    const result = await response.json();
    console.log(result);

    // UI 생성
    document.forms[0].insertAdjacentHTML("afterend", cardTemplate(result.data));
  });
})();

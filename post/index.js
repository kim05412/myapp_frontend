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

// 로딩
(async () => {
  const url = "http://localhost:8080/posts";
  // 1. 서버에서 데이터 가져옴(data:jason 형식(텍스트))
  const response = await fetch(url);
  console(response);
  // 파싱: JSON 형식의 데이터를 읽고 자바스크립트 객체로 변환
  const result = await response.jason();
  console(result);

  // 배열 형태
  const data = Array.from(result);
  console.log(data);

  // 2. 데이터배열 반복문으로 html문자열 추가
  data.forEach((writing) => {
    document.forms[0].insertAdjacentHTML("afterend", cardTemplate(writing));
  });
})();

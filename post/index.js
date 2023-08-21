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

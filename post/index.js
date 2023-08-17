let currentPage = 0; // 현재 페이지  -> 이전/다음/특정 페이징 이동
let isLastPage = false;
const PAGE_SIZE = 10;
let currentQuery = ""; // 현재 검색 키워드 저장-> 페이징과 검색 동시

function createRow(name, phone, email, image) {
  // 1. 요소 생성
  const tr = document.createElement("tr");

  // 2. 요소의 속성 설정
  tr.dataset.email = email;
  tr.innerHTML = /*html*/ `
  <td>${name}</td>
  <td>${phone}</td>
  <td>${email}</td>  
  <td>${
    image ? `<img width="auto" height="30" src="${image}" alt="${name}">` : ""
  }</td>
  <td><button class="btn-modify">수정</button></td>
  `;
  return tr;
}

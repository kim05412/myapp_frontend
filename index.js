let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

// template: UI형식의 틀
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
async function getPagedList(page, query) {
  let url = "";
  // 검색 조건이 있다.
  if (query) {
    url = `http://localhost:8080/contacts/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
  } else {
    url = `http://localhost:8080/contacts/paging?page=${page}&size=${PAGE_SIZE}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  // 401: 미인증, 403: 미인가(허가없는)
  if ([401, 403].includes(response.status)) {
    // 로그인 페이지로 튕김
    alert("인증처리가 되지 않았습니다.");
    window.location.href = "/login.html";
  }
  // 결과가 배열
  const result = await response.json();
  console.log(result);

  const tbody = document.querySelector("tbody");

  // 목록 초기화
  tbody.innerHTML = "";
  // 배열 반복을 해서 tr만든다음에 tbody 가장 마지막 자식에 추가
  for (let item of result.content) {
    tbody.append(createRow(item.name, item.phone, item.email, item.image));
  }

  currentPage = result.number; // 현재 페이지 설정
  isLastPage = result.last; // 마지막 페이지 여부

  // 이전/다음 버튼 활성화 처리
  setBtnActive();
}

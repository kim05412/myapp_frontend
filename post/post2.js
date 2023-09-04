let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

// 웹페이지 로딩이 완료되면, 페이징으로 데이터 조회 및 목록 생성
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    // 첫번째 페이지 조회
    getPagedList(0);
  });
})();

// 이전/다음 페이징
(() => {
  // 이전/다음 버튼 선택
  const buttons = document.forms[1].querySelectorAll("button");

  const btnPrev = buttons[2];
  const btnNext = buttons[3];

  // 이전 버튼
  btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage > 0 && getPagedList(currentPage - 1, currentQuery);
  });
  // 다음 버튼
  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    !isLastPage && getPagedList(currentPage + 1, currentQuery);
  });
})();

// page: 1, currentPage: 0
// 데이터처리 정상적으로 조회되고, 화면 제대로 나왔으면
// currentPage: 1
async function getPagedList(page, query) {
  let url = "";
  // 검색 조건이 있다.
  if (query) {
    url = `http://localhost:8080/posts/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
  } else {
    url = `http://localhost:8080/posts/paging?page=${page}&size=${PAGE_SIZE}`;
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
    window.location.href = `http://localhost:5502`;
  }
  // 결과가 배열
  const result = await response.json();
  console.log(result);

  const tbody = document.querySelector("tbody");

  // 목록 초기화
  tbody.innerHTML = "";
  // 배열 반복을 해서 tr만든다음에 tbody 가장 마지막 자식에 추가
  for (let item of result.content) {
    tbody.append(createRow(item.menu, item.address, item.nickname, item.file));
  }

  currentPage = result.number; // 현재 페이지 설정
  isLastPage = result.last; // 마지막 페이지 여부

  // 이전/다음 버튼 활성화 처리
  setBtnActive();
}

// 이전/다음 버튼 활성화 여부 처리
function setBtnActive() {
  const buttons = document.forms[1].querySelectorAll("button");

  const btnPrev = buttons[2];
  const btnNext = buttons[3];

  // 첫번째 페이지이면 이전 버튼 비활성화
  if (currentPage === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }
  // 마지막 페이지이면 다음 버튼 비활성화
  if (isLastPage) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

//  포스트 템플릿
function cardTemplate(post) {
  const road = extractAddressParts(post.address).roadName;
  const template = /*html*/ `
  <div style="width:300px; margin-bottom:3rem;" data-no="${post.no}">
    <em>${post.menuTypeSelects}</em>
    <button class="btn-detail">상세보기<button>
    <hr>
    <h3>${post.title}</h3>
    <div>${post.file}<div>
    <div>${road}<div>
    <p>${post.review}</p>
    
    <hr>
    <div style="display:flex; justify-content:space-between;">
      <small>${new Date(post.createdTime).toLocaleString()}</small>
      <small>${new Date(post.nickname).toLocaleString()}</small>

      <button class="btn-detali">상세보기</button>
    </div>
  </div>
`;
  return template;
}
//탬플릿-테이블
// function createRow(menu, address, nickname, file) {
//   // 1. 요소 생성
//   const tr = document.createElement("tr");

//   // 2. 요소의 속성 설정
//   tr.dataset.nickname = nickname;
//   tr.innerHTML = /*html*/ `
//   <td>${menu}</td>
//   <td>${address}</td>
//   <td>${nickname}</td>
//   <td>${
//     file ? `<img width="auto" height="30" src="${file}" alt="${menu}">` : ""
//   }</td>
//   <td><button class="btn-modify">수정</button></td>
//   `;
//   return tr;
// }

// 주소표시
function extractAddressParts(address) {
  const roadNameRegex = /([가-힣]+로)\s*$/;
  const buildingNumberRegex = /(\d+번지)\s*$/;

  const roadNameMatch = address.match(roadNameRegex);
  const buildingNumberMatch = address.match(buildingNumberRegex);

  const roadName = roadNameMatch ? roadNameMatch[1] : "";
  const buildingNumber = buildingNumberMatch ? buildingNumberMatch[1] : "";

  return {
    roadName,
    buildingNumber,
  };
}

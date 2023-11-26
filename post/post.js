let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

//화면을 처음 켰을 때 첫번째 페이지 조회
window.addEventListener("DOMContentLoaded", displayPosts());

// (() => {
//   window.addEventListener("DOMContentLoaded", async () => {
//     getPagedList;
//   });
// })();
// async function getPagedList(page, query) {
//   // const imageElement = `<img src="${post.image}" alt="음식사진">`;
//   let url = "";
//   // 검색 조건이 있다.
//   if (query) {
//     url = `http://localhost:8080/posts/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
//   } else {
//     url = `http://localhost:8080/posts/paging?page=${page}&size=${PAGE_SIZE}`;
//   }

//   const response = await fetch(url);

//   // 결과가 배열
//   const result = await response.json();
//   console.log(result);

//   const tbody = document.querySelector(" tbody");

//   // 목록 초기화
//   tbody.innerHTML = "";
//   // 배열 반복을 해서 tr만든다음에  tbody 가장 마지막 자식에 추가
//   for (let post of result.content) {
//     tbody.append(
//       createRow(
//         post.menu,
//         post.address,
//         post.nickname,
//         `<img src="${post.image}" alt="음식사진">`
//       )
//     );
//   }

//   currentPage = result.number; // 현재 페이지 설정
//   isLastPage = result.last; // 마지막 페이지 여부

//   // 이전/다음 버튼 활성화 처리
//   setBtnActive();
// }

// 서버로부터 데이터를 가져 옴
async function displayPosts() {
  const url = `${apiUrl()}/posts`;

  // 1. fetch, 서버에서 데이터 가져오기
  const response = await fetch(url, {
    method: "GET",
  });
  const result = await response.json();
  console.log(result);

  const article = document.querySelector("article");

  // 목록 초기화
  article.innerHTML = "";

  // 배열 반복을 해서 tr만든다음에 article 가장 마지막 자식에 추가
  for (let post of result) {
    article.insertAdjacentHTML("beforeend", cardTemplate(post));
  }
  // 이전/다음 버튼 활성화 처리
  setBtnActive();
}

// // 이전/다음 페이징
// (() => {
//   // 이전/다음 버튼 선택
//   const buttons = document.forms[1].querySelectorAll("button");

//   const btnPrev = buttons[2];
//   const btnNext = buttons[3];

//   // 이전 버튼
//   btnPrev.addEventListener("click", (e) => {
//     e.preventDefault();
//     currentPage > 0 && getPagedList(currentPage - 1, currentQuery);
//   });
//   // 다음 버튼
//   btnNext.addEventListener("click", (e) => {
//     e.preventDefault();
//     !isLastPage && getPagedList(currentPage + 1, currentQuery);
//   });
// })();
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
  const imageElement = `<img src="${post.image}" alt="음식사진">`;
  // const road = extractAddressParts(post.address).roadName;
  const template = /*html*/ `
  <div style="width:300px; margin-bottom:3rem;" data-no="${post.no}">
  console.log(post.no)

    <em>${post.selected}</em>
    <button class="btn-detail">상세보기
    <hr>
    <h3>${post.title}</h3>
    <div>${imageElement}<div>
    <div>${post.address}<div>
    <p>${post.review}</p>
    
    <hr>
    <div style="display:flex; justify-content:space-between;">
      <small>${new Date(post.createdTime).toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
      })}</small>
      <small>${post.nickname}</small>
       <small>${post.company}</small><button>

      
    </div>
  </div>
`;
  return template;
}

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
//배포
function isLocalhost() {
  return ["localhost", "127.0.0.1"].includes(location.hostname);
}
function apiUrl() {
  return `${isLocalhost() ? "http://" + location.hostname + ":8080/api" : "https://" + location.hostname + "/api"}`;
}

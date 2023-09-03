// let currentPage = 0; // 현재 페이지 번호
// let isLastPage = false; // 마지막 페이지 인지 여부
// const PAGE_SIZE = 12; // 고정된 페이지 사이즈
// let currentQuery = ""; // 현재 검색 키워드

// // page: 1, currentPage: 0
// // 첫화면
// (()=> {
//   window.addEventListener("DOMContentLoaded", async()=>{

//     const response = await fetch(`http://localhost:8080/post'), {
//       method : "GET"
//     },
//   });

// async function getPagedList(page, query) {
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

//   // 배열로 변환
//   const data = Array.from(result);
//   console.log(data);

//   // 컨테이너에 추가
//   data
//     // 데이터를 다시 오름차순 정렬
//     .sort((a, b) => a.no - b.no)
//     // 반복문으로 form이 맨위에 추가 됙
//     .forEach(() => {
//       // [0]째 폼의 뒤에 새로운 html 추가
//       document.forms[0].insertAdjacentHTML(
//         "afterend",
//         cardTemplate()
//         // 인자가 주어진 경우 해당 아이템의 정보를 바탕으로 HTML 문자열 생성
//       );
//     });

//   const tbody = document.querySelector("tbody");

//   // 목록 초기화
//   tbody.innerHTML = "";
//   // 배열 반복을 해서 tr만든다음에 tbody 가장 마지막 자식에 추가
//   for (let item of result.content) {
//     tbody.append(cardTemplate(item.title, item.loadedFiles, item.menuTypeSelects, item.address));
//   }

//   currentPage = result.number; // 현재 페이지 설정
//   isLastPage = result.last; // 마지막 페이지 여부

//   // 이전/다음 버튼 활성화 처리
//   setBtnActive();
// })();

// //  포스트 템플릿
// function cardTemplate(post) {
//   const road = extractAddressParts(post.address).roadName;
//   const template = /*html*/ `
//   <div style="width:300px; margin-bottom:3rem;" data-no="${post.no}">
//     <em>${post.menuTypeSelects}</em>
//     <button class="btn-detail">상세보기<button>
//     <hr>
//     <h3>${post.title}</h3>
//     <div>${post.loadedFiles}<div>
//     <div>${road}<div>
//     <p>${post.review}</p>

//     <hr>
//     <div style="display:flex; justify-content:space-between;">
//       <small>${new Date(post.createdTime).toLocaleString()}</small>
//       <button class="btn-detali">상세보기</button>
//     </div>
//   </div>
// `;
//   return template;
// }

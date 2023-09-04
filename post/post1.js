let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

//화면을 처음 켰을 때 첫번째 페이지 조회
tbody = document.querySelector("tbody");
(async () => {
  const url = "http://localhost:8080/posts";

  // 1. fetch, 서버에서 데이터 가져오기
  const response = await fetch(url);
  //json로 변환
  const result = await response.json();
  console.log(result);

  result.forEach((post) => {
    tbody.insertAdjacentHTML("beforeend", cardTemplate(post));
  });

  //  포스트 템플릿
  function cardTemplate(post) {
    const road = extractAddressParts(post.address).roadName;
    const template = /*html*/ `
  <div style="width:300px; margin-bottom:3rem;" data-no="${post.no}">
    <em>${post.menuTypeSelects}</em>
    <button class="btn-detail">상세보기<button>
    <hr>
    <h3>${post.title}</h3>
    <div>${post.loadedFiles}<div>
    <div>${road}<div>
    <p>${post.review}</p>
    
    <hr>
    <div style="display:flex; justify-content:space-between;">
      <small>${new Date(post.createdTime).toLocaleString()}</small>
      <button class="btn-detali">상세보기</button>
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

  //  세부사항 템플릿
  // function detailTemplate(post) {
  //   const template = /*html*/ `
  //   <div style="width:300px; margin-bottom:3rem;" data-no="${post.no}">
  //   <em>${post.menuTypeSelects}</em>
  //   <hr>
  //   <h3>${post.title}</h3>
  //   <div>${posst.nickname}</div>
  //   <div>${post.address}<div>
  //   <div>${post.loadedFiles}<div>
  //   <p>${post.review}</p>
  //   <hr>
  //   <div style="display:flex; justify-content:space-between;">
  //     <small>${new Date(post.createdTime).toLocaleString()}</small>
  //     <button class="btn-detali">상세보기</button>
  //   </div>
  //   </div>
  //   `;
  //   return template;
  // }
})();

//포스트 작성

// // 제출버튼 -> 추가 기능
// add.addEventListener(async () => {
//   const form = document.querySelector(".write");
//   const selectedMenuTypes = [];

//   // 배열에 추가
//   selectedMenuTypes.forEach((select) => {
//     select.addEventListener("change", (event) => {
//       const selectedValue = event.target.value;

//       // 이미 선택한 값인지 중복 여부 확인
//       if (!selectedMenuTypes.includes(selectedValue)) {
//         selectedMenuTypes.push(selectedValue);
//       } else {
//         alert("다른 타입을 선택해주세요");
//       }
//     });
//   });

//   // 이미지 파일 문자열 변환-> 배열추가
//   const fileInputs = form.querySelectorAll(".fileInput"); // 문자열로 먼저 모두 바꾸고 배열에 추가해야해서 필요함
//   const loadedFiles = [];

//   //배열추가 :파일->문자열
//   const  reader= new FileReader();
// (async()=> {fileInputs.forEach((fileInputs) => {
//   const file = fileInputs.files[0];
//   if (file) {
//     reader.addEventListener("load", (e) => {
//       // reader.readAsDataURL(file);
//       const imageDataString = e.target.result.split(",")[1]; //실제 데이터를 헤더(data:image/jpeg;base64)와 분리해서 추출
//       loadedFiles.push(imageDataString);
//     });
//   }

//   const titleInput = form.querySelector("#title");
//   const menuInput = form.querySelector("#menu");

//   const addressInput = form.querySelector("#address");
//   const reviewTextarea = form.querySelector("#review");

//   const add = form.querySelector(".btn-submit");

//   // 필수 입력값 체크
//   if (selectedMenuTypes.length === 0) {
//     alert("메뉴 타입을 한개 이상 선택해주세요.");
//     return; // 전송 중지
//   }
//   //첫번째 필수 입력
//   if (loadedFiles[0].length === 0) {
//     alert("첫 번째 이미지 파일은 필수로 업로드해야 합니다.");
//     return; // 전송 중지
//   }
//   if (!titleInput.value || !menuInput.value || !addressInput.value || !reviewTextarea.value) {
//     alert("모든 필수 입력값을 작성해주세요.");
//     return; // 전송 중지
//   }
//   // 서버에 데이터 전송
//   async function sendData(form){
//     const response = await fetch("http://localhost:8080/posts", {
//     // HTTP Method: 서버로 추가 요청
//     method: "POST",
//     // 보낼 데이터 형식은 json
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${getCookie("token")}`,
//     },
//     body: JSON.stringify({
//       selectedMenuTypes: selectedMenuTypes,
//       loadedFiles: loadedFiles,
//       title: titleInput.value,
//       menu: menuInput.value,
//       address: addressInput.value,
//       review: reviewTextarea.value,
//     }),
//   });}

//   console.log(response);
//     // 다른 페이지로 이동
//     window.location.href = "http://localhost:5502/index";

// });})

// })();

// 상세페이지 get
// 데이터 가져옴
// const buttonDetail = document.querySelector("btn-detail");
// buttonDetail.addEventListener("click", async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:8080/posts/`${no}`");
//     const result = response.json;
//     // const postId = result.data.id;
//     // console.log(postId);
//     console.log(result);
//     // UI생성
//     document.forms[0].insertAdjacentHTML("afterend", cardTemplate(result.data));
//   })();

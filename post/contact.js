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

// page: 1, currentPage: 0
// 데이터처리 정상적으로 조회되고, 화면 제대로 나왔으면
// currentPage: 1
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

// 이전/다음 버튼 활성화 여부 처리
function setBtnActive() {
  const buttons = document.forms[2].querySelectorAll("button");

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

// // 데이터 조회 및 목록 생성
// (() => {
//   window.addEventListener(
//     "DOMContentLoaded",
//     async () => {
//       const response = await fetch(
//         "http://localhost:8080/contacts"
//       );
//       // 결과가 배열
//       const result = await response.json();
//       console.log(result);

//       const tbody =
//         document.querySelector("tbody");

//       // 배열 반복을 해서 tr만든다음에 tbody 가장 마지막 자식에 추가
//       for (let item of result) {
//         tbody.append(
//           createRow(
//             item.name,
//             item.phone,
//             item.email,
//             item.image
//           )
//         );
//       }
//     }
//   );
// })();

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
  const buttons = document.forms[2].querySelectorAll("button");

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

// 검색 기능
(() => {
  const txtQuery = document.forms[2].querySelector("input");
  const btnSearch = document.forms[2].querySelector("button");

  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    currentQuery = txtQuery.value;
    getPagedList(0, currentQuery);
  });

  txtQuery.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key.toLocaleLowerCase() === "enter") {
      currentQuery = txtQuery.value;
      getPagedList(0, currentQuery);
    }
  });
})();

// 검색조건 초기화
(() => {
  const btnReset = document.forms[2].querySelectorAll("button")[1];
  btnReset.addEventListener("click", (e) => {
    e.preventDefault();

    // 검색조건 입력박스 초기화
    document.forms[2].reset();

    // 검색조건값 초기화
    currentQuery = "";

    // 검색조건이 초기화되면 0번페이지에서 다시 조회
    getPagedList(0, currentQuery);
  });
})();

// 추가폼 처리
(() => {
  const form = document.forms[0];
  const inputs = form.querySelectorAll("input");

  const name = inputs[0];
  const phone = inputs[1];
  const email = inputs[2];
  const file = inputs[3]; // input type="file"

  const add = form.querySelector("button");

  add.addEventListener("click", (e) => {
    e.preventDefault();

    if (email.value === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (name.value === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (phone.value === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }

    // 데이터를 서버에 전송하고, UI요소 생성
    async function createContact(image) {
      /// --- 서버전송하면 UI 생성

      // 서버에 데이터를 전송
      // fetch(url, options)
      const response = await fetch("http://localhost:8080/contacts", {
        // HTTP Method
        method: "POST",
        // 보낼 데이터 형식은 json
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          phone: phone.value,
          image: image ? image : null,
        }),
      });
      console.log(response);

      const result = await response.json();
      console.log(result);

      // 화면에 요소를 추가하는 것은 데이처리가 정상적으로 된 다음에
      // 서버에서 응답받은 데이터
      const { data } = result;

      // --- 3. 어딘가(부모, 다른요소)에 추가한다(append, prepend);
      document
        .querySelector("tbody")
        .prepend(createRow(data.name, data.phone, data.email, data.image));
      form.reset();
    }

    if (file.files[0]) {
      // 파일이 있을 때
      const reader = new FileReader();
      // reader로 파일을 읽기가 완료되면 실행되면 이벤트 핸들러 함수
      reader.addEventListener("load", async (e) => {
        console.log(e);
        // file -> base64 data-url
        const image = e.target.result;
        createContact(image);
      });
      // 파일을 dataURL(base64)로 읽음
      reader.readAsDataURL(file.files[0]);
    } else {
      // 파일이 없을 때
      createContact();
    }

    // return;
  });
})();

// 삭제폼 처리
(() => {
  const form = document.forms[1];

  const email = form.querySelector("input");
  const del = form.querySelector("button");

  del.addEventListener("click", async (e) => {
    e.preventDefault();

    // 서버통신
    await fetch(`http://localhost:8080/contacts/${email.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });

    const tr = document.querySelector(`tr[data-email="${email.value}"]`);

    if (!tr) {
      alert("해당 이메일의 연락처 없습니다.");
      return;
    }

    tr.remove();

    form.reset();
  });
})();

// 수정처리(이벤트 위임)
(() => {
  document.querySelector("tbody").addEventListener("click", (e) => {
    // 수정버튼을 클릭한 이벤트에 작동
    if (e.target.classList.contains("btn-modify")) {
      // jsdoc type 힌트를 넣어줌
      /** @type {HTMLButtonElement} */
      const modifyBtn = e.target;
      // button -> td -> tr
      const row = modifyBtn.parentElement.parentElement; // tr
      // tr의 모든 데이터셀의 내부값 가져오기
      const cells = row.querySelectorAll("td");
      console.log(cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML);

      // 모달 레이어 띄우기
      /** @type {HTMLDivElement} */
      const layer = document.querySelector("#modify-layer");
      layer.hidden = false;

      // 모달 내부의 폼에 선택값을 채워 넣음
      layer.querySelector("h3").innerHTML = cells[2].innerHTML;
      const inputs = layer.querySelectorAll("input");
      inputs[0].value = cells[0].innerHTML;
      inputs[1].value = cells[1].innerHTML;

      // 확인/취소 버튼이 이벤트 핸들러 추가
      const buttons = layer.querySelectorAll("button");
      // 취소 버튼
      buttons[1].addEventListener("click", (e) => {
        e.preventDefault();
        layer.hidden = true;
      });

      // 수정 버튼
      buttons[0].addEventListener("click", async (e) => {
        e.preventDefault();
        // 셀이 있는 고정값
        const email = cells[2].innerHTML;
        // 입력값으로
        const name = inputs[0].value;
        const phone = inputs[1].value;

        const options = {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        };
        // 서버 연동
        const response = await fetch(
          `http://localhost:8080/contacts/${email}`,
          options
        );

        console.log(response.status);

        // 데이터셀의 값을 수정입력 폼의 값으로 바꿨음.
        cells[0].innerHTML = inputs[0].value;
        cells[1].innerHTML = inputs[1].value;
        layer.hidden = true;
      });
    }
  });
})();

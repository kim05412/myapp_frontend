let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

//작성시 로그인
(() => {
  hiddenButton();
  loginLogout();
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "http://localhost:5500/index.html";
    alert("포스팅을 작성하기 위해서는 로그인이 필요합니다.");
  }
})();

// 작성된 포스팅 추가 기능
(() => {
  //컬렉션
  const form = document.forms[0];
  const btn = form.querySelector(".btn-submit");
  // NodeList 객체로 반환->array로 변환-> 각 요소(select)의 value값 추출->새로운 배열
  const types = Array.from(form.querySelectorAll(".menu-type")).map(
    (select) => select.value
  );
  const title = form.querySelector("#title");
  const menu = form.querySelector("#menu");
  const review = form.querySelector("textarea");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (types.length === 0) {
      alert("메뉴 타입을 한가지 이상 선택해주세요.");
      return; // 폼 전송을 중지합니다.
    }
    // 타입 한개 이상 선택시->전송
    const response = await fetch("http://localhost:8080/posts", {
      // request: 추가
      method: "POST",
      headers: {
        // 요청의 본문이 JSON 형식임을 서버에 알려줌.
        "Content-Type": "application/json",
        // 인증토큰 서버로
        // Authorization: `Bearer ${getCookie("token")}`,
      },
      // 요청의 본문에 실제 데이터 담음
      body: JSON.stringify({
        // JavaScript 객체를 JSON 문자열로 변환한 후 전송
        types: types,
        title: title.value,
        menu: menu.value,
        review: review.value,
      }),
    });

    console.log(response);
    const request = await response.jason();
    console.log(result);

    alert("포스트 작성이 완료 되었습니다!");

    // UI 추가 (display)
    document.forms[0].insertAdjacentHTML(
      "afterend",
      cardTemplate(request.data)
    );
  });
})();

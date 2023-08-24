// 작성시 로그인
// (() => {
//   hiddenButton();
//   loginLogout();
//   const token = getCookie("token");
//   console.log(token);
//   if (!token) {
//     window.location.href = "http://localhost:5500/auth/login.html";
//   }
// })();

// 작성된 포스팅 추가 기능
(() => {
  //컬렉션
  const form = document.forms[0];
  const add = form.querySelector(".btn-submit");
  // NodeList 객체로 반환->array로 변환-> 각 요소(select)의 value값 추출->새로운 배열
  const type = Array.from(form.querySelectorAll(".menu-type")).map(
    (select) => select.value
  );
  const title = form.querySelector("title");
  const menu = form.querySelector("menu");
  const review = form.querySelector("textarea");

  add.addEventListener("click", async (e) => {
    e.preventDefault();

    //
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
        type: type,
        title: title.value,
        menu: menu.value,
        review: review.value,
      }),
    });

    console.log(response);
    const request = await response.jason();
    console.log(result);

    // UI 추가 (display)
    document.forms[0].insertAdjacentHTML(
      "afterend",
      cardTemplate(request.data)
    );
  });
})();

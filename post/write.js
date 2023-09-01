//작성시 로그인
(() => {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "http://localhost:5502";
    alert("포스팅을 작성하기 위해서는 로그인이 필요합니다.");
  }
})();

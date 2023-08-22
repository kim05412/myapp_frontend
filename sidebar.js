//즉시 실행 표현식 사용-> 로드시 바로 실행
(() => {
  const sidebar = document.createElement("aside"); //새로운 HTML 요소를 생성
  sidebar.style.position = "fixed"; // sticky
  sidebar.style.height = "280px";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "200px";
  sidebar.style.backgroundColor = "white";
  sidebar.style.borderRadius = "15px";

  sidebar.innerHTML = /*html */ `
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/menu/korean.html">한식</a></li>
      <li><a href="/menu/japenese.html">일식</a></li>
      <li><a href="/menu/chinese.html">중식</a></li>
      <li><a href="/menu/western.html">양식</a></li>
      <li><a href="/menu/bunsic.html">분식</a></li>
      <li><a href="/menu/asian.html">동남아식</a></li>
      <li><a href="/menu/others.html">기타</a></li>
    </ul>
  `;

  document.body.prepend(sidebar); //body요소 맨 앞에 추가
})();

(() => {
  const sidebar = document.createElement("aside");
  sidebar.style.position = "fixed";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "200px";

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
  document.body.prepend(sidebar);
})();

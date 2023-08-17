(() => {
  const sidebar = document.createElement("aside");
  sidebar.style.position = "fixed";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "200px";

  sidebar.innerHTML = /*html */ `
    <ul>
      <li><a href="home">Home</a></li>
      <li><a href="korean">한식</a></li>
      <li><a href="japenese">일식</a></li>
      <li><a href="chinese">중식</a></li>
      <li><a href="western">양식</a></li>
      <li><a href="bunsic">분식</a></li>
      <li><a href="east-asia">동남아식</a></li>
      <li><a href="others">기타</a></li>
    </ul>
  `;

  document.body.prepend(sidebar);
})();

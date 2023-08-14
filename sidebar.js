(() => {
  const sidebar = document.createElement("aside");
  sidebar.style.position = "fixed";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "200px";

  sidebar.innerHTML = /*html */ `
    <h3 style="margin-top:0;"><a href="/">Home</a></h3>
    <ul>
      <li><a href="/todo/todo.html">한식</a></li>
      <li><a href="/todo/todo.html">일식</a></li>
      <li><a href="/contact/contact.html">중식</a></li>
      <li><a href="/post/post.html">양식</a></li>
      <li><a href="#">분식</a></li>
      <li><a href="#">동남아식</a></li>
      <li><a href="#">기타</a></li>
    </ul>
  `;

  document.body.prepend(sidebar);
})();

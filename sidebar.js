(() => {
  const sidebar = document.createElement("aside");
  sidebar.style.position = "fixed";
  sidebar.style.height = "100vh";
  sidebar.style.width = "200px";
  sidebar.style.marginTop = "40px";

  sidebar.innerHTML = /*html */ `
    <h3 style="margin-top:0;"><a href="/">Home</a></h3>
    <ul>
      <li><a href="/todo/todo.html">To-do List</a></li>
      <li><a href="/contact/contact.html">Contacts</a></li>
      <li><a href="/post/post.html">Posts</a></li>
      <li><a href="#">Coming soon</a></li>
    </ul>
  `;

  document.body.prepend(sidebar);
})();

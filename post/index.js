// 작성한 포스트
function cardTemplate(item) {
  // 1개 이상의 값 선택
  const menuTypes = document.querySelectorAll(".menu-type");
  const postTitle = document.querySelector("#title").value;
  const menuName = document.querySelector("#menu").value;
  const restaurantAddress = document.querySelector("#address").value;
  const postContent = document.querySelector("#review").value;

  const xhr = new XMLHttpRequest();
  const url = "/post/write"; // 데이터를 전송할 URL
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(
    JSON.stringify({
      menuType,
      postTitle,
      menuName,
      restaurantAddress,
      postContent,
    })
  );
}

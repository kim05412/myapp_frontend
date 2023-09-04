// // 페이지 로드 시 데이터를 가져와서 화면에 표시
// window.addEventListener("DOMContentLoaded", fetchPosts);

// async function fetchPosts() {
//   try {
//     const response = await fetch("http://localhost:8080/posts", {
//       method: "GET",
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();

//     // 받은 데이터를 이용하여 원하는 작업 수행
//     console.log(data); // 받은 데이터를 콘솔에 출력하는 예시
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }

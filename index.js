// 페이지 로드 시 포스트 데이터 가져오기
window.addEventListener("load", fetchAndDisplayPosts);

// 서버로부터 최신순으로 정렬된 포스트 데이터를 가져와서 화면에 표시
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch("/api/posts"); // 포스트 데이터를 가져올 API 엔드포인트
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json(); // 포스트 데이터를 JSON 형태로 파싱

    // 포스트 목록을 최신순으로 정렬 (가장 최근에 작성된 포스트가 먼저 오도록)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const postsContainer = document.getElementById("postsContainer"); // 포스트를 표시할 컨테이너 요소

    // 기존 포스트를 모두 제거
    postsContainer.innerHTML = "";

    // 각 포스트를 화면에 추가
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>작성일: ${new Date(post.createdAt).toLocaleString()}</p>
            `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

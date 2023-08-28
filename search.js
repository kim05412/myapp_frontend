let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

(() => {
  // 새로운 HTML 요소를 생성
  const searchContainer = document.createElement("div");
  searchContainer.style.display = "flex";
  searchContainer.style.direction = "row";
  searchContainer.style.justifyContent = "space-between"; // 버튼과 입력란을 양쪽 끝에 정렬
  searchContainer.style.marginTop = "15px";
  searchContainer.style.width = "50%";
  searchContainer.style.height = "45px";
  searchContainer.style.backgroundColor = "white";
  searchContainer.style.borderRadius = "15px";
  searchContainer.style.border = "4px solid #FFC939";
  searchContainer.style.position = "absolute"; // 절대 위치 설정
  searchContainer.style.top = "100px"; // 세로 방향 중앙
  searchContainer.style.left = "50%"; // 가로 방향 중앙
  searchContainer.style.transform = "translate(-50%, -50%)";

  // 내부 요소 생성
  searchContainer.innerHTML = /*html */ `
    <form action="submit" style="display: flex;  height: 100%; width: 100%;">
      <input id="search-input" type="text" placeholder="검색할 내용을 입력해주세요" style="flex: 1; padding: 5px; border: none; border-radius: 15px 0 0 15px; text-align: center;">
      <button id="btn-search" style="width: 15%; background-color: #ccc; border-radius: 0 10px 10px 0; border:none;">검색</button>
    </form>
  `;

  // 헤더 위치에 삽입
  const targetHeader = document.querySelector("header"); // 헤더를 선택
  targetHeader.appendChild(searchContainer); // 헤더에 검색 컨테이너 추가
})();

const searchResultsElement = document.getElementById("searchResults");
const searchButton = document.getElementById("searchButton");

// 검색 결과를 표시하는 함수
function displaySearchResults(data) {
  searchResultsElement.innerHTML = ""; // 이전 검색 결과를 지웁니다.

  data.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result.title;
    searchResultsElement.appendChild(li);
  });

  if (isLastPage) {
    searchResultsElement.innerHTML += "<p>End of results.</p>";
  }
}

// 검색 버튼 클릭 시 실행되는 함수
searchButton.addEventListener("click", () => {
  currentPage = 0; // 검색어가 바뀌면 페이지를 초기화합니다.
  isLastPage = false;
  currentQuery = document.getElementById("searchInput").value; // 검색어를 가져옵니다.
  fetchSearchResults();
});

// 검색 결과를 가져와 페이징 처리하는 함수
async function fetchSearchResults() {
  try {
    const response = await fetch(
      `/search?q=${currentQuery}&page=${currentPage}&size=${PAGE_SIZE}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displaySearchResults(data);

    if (data.length < PAGE_SIZE) {
      isLastPage = true;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
  // 초기 페이지 로딩 시 실행되는 함수
  function initialize() {
    // 페이지가 로드될 때 초기화 코드

    // 초기 검색 결과 표시
    fetchSearchResults();
  }

  // 페이지가 로드되면 initialize 함수를 호출하여 초기화합니다.
  document.addEventListener("DOMContentLoaded", initialize);
}

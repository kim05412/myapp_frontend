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
      <input type="text" placeholder="검색할 내용을 입력해주세요" style="flex: 1; padding: 5px; border: none; border-radius: 15px 0 0 15px; text-align: center;">
      <button id="btn-search" style="width: 15%; background-color: #ccc; border-radius: 0 10px 10px 0; border:none;">검색</button>
    </form>
  `;

  // 헤더 위치에 삽입
  const targetHeader = document.querySelector("header"); // 헤더를 선택
  targetHeader.appendChild(searchContainer); // 헤더에 검색 컨테이너 추가
})();

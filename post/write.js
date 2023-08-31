//작성시 로그인
(() => {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "http://localhost:5500";
    alert("포스팅을 작성하기 위해서는 로그인이 필요합니다.");
  }
})();

// 제출버튼 -> 추가 기능
(() => {
  const form = document.forms[0];
  const add = form.querySelector(".btn-submit");
  const selectedMenuTypes = [];
  // 배열에 추가
  menuTypeSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const selectedValue = event.target.value;

      // 이미 선택한 값인지 중복 여부 확인
      if (!selectedMenuTypes.includes(selectedValue)) {
        selectedMenuTypes.push(selectedValue);
      } else {
        alert("다른 타입을 선택해주세요");
      }
    });
  });

  // 이미지 파일 문자열 변환-> 배열추가
  const fileInputs = form.querySelectorAll(".fileInput"); // 문자열로 먼저 모두 바꾸고 배열에 추가해야해서 필요함
  const loadedFiles = [];
  //배열추가 :파일->문자열
  fileInputs.forEach((fileInput) => {
    const loadedFiles = fileInput.files;

    for (const file of loadedFiles) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", async (e) => {
        const imageDataString = reader.result.split(",")[1]; //실제 데이터를 헤더(data:image/jpeg;base64)와 분리해서 추출

        loadedFiles.push(imageDataString);
      });
    }
  });

  const titleInput = form.querySelector("#title");
  const menuInput = form.querySelector("#menu");

  const addressInput = form.querySelector("#address");
  const reviewTextarea = form.querySelector("#review");

  add.addEventListener(async (e) => {
    e.preventDefault();

    // 필수 입력값 체크
    if (selectedMenuTypes.length === 0) {
      alert("메뉴 타입을 한개 이상 선택해주세요.");
      return; // 전송 중지
    }
    //첫번째 필수 입력
    const loadedFiles = fileInputs[0].files;
    if (loadedFiles.length === 0) {
      alert("첫 번째 이미지 파일은 필수로 업로드해야 합니다.");
      return; // 전송 중지
    }
    if (
      !titleInput.value ||
      !menuInput.value ||
      !addressInput.value ||
      !reviewTextarea.value
    ) {
      alert("모든 필수 입력값을 작성해주세요.");
      return; // 전송 중지
    }
    // 서버에 데이터 전송
    const response = await fetch("http://localhost:8080/posts", {
      // HTTP Method: 서버로 추가 요청
      method: "POST",
      // 보낼 데이터 형식은 json
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({
        selectedMenuTypes: selectedMenuTypes,
        loadedFiles: loadedFiles,
        title: titleInput.value,
        menu: menuInput.value,
        address: addressInput.value,
        review: reviewTextarea.value,
      }),
    });
    console.log(response);

    const result = await response.json();
    console.log(result);

    // UI 생성
    document.forms[0].insertAdjacentHTML("afterend", cardTemplate(result.data));

    // //폼 데이터 형식
    // const formData = new FormData();
    // formData.append("selectedMenuTypes[]", value);
    // formData.append("loadedFiles[]", value);
    // formData.append("title", titleValue);
    // formData.append("menu", menuValue);
    // formData.append("address", addressValue);
    // formData.append("review", reviewValue);

    // try {
    //   const response = await fetch("http://localhost:8080/posts", {
    //     method: "POST",
    //     body: JSON.stringify(postData), // JSON 데이터 전송
    //     headers: {
    //       "Content-Type": "application/json", // JSON 형식 설정
    //       Authorization: `Bearer ${getCookie("token")}`,
    //     },
    //   });

    //   if (response.ok) {
    //     alert("포스트 작성 완료.");
    //     window.location.replace("http://localhost:5500");
    //   } else {
    //     console.error("서버 응답 오류:", response.status);
    //     alert("포스트 작성 중 오류가 발생했습니다.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("서버 오류가 발생했습니다.");
    // }
  });
})();

// // 여러 파일 추가
// const filesInput = document.getElementById("fileInput");
// files.setAttribute("multiple", "multiple");

// filesInput.addEventListener("change", (event) => {
//   const loadedFiles
//  = event.target.files; // 여러 개의 선택된 파일들의 목록

//   // 선택된 각 파일에 대한 처리
//   for (const file of selectedFiles) {
//     // file은 각각의 선택된 파일을 나타냄
//     console.log(file.name); // 파일 이름 출력 또는 다른 원하는 작업 수행
//   }
// });
// UI 추가 (display)
// document.forms[0].insertAdjacentHTML(
//   "beforeend",
//   cardTemplate(request.data)
// );

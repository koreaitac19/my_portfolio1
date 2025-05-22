//글저장
function saveBoard() {
	let bwFrm = document.boardWriteForm;
	if (bwFrm.title.value == "") {
		alert("게시글 제목을 작성하세요.");
		bwFrm.title.focus();
		return;
	}

	if (bwFrm.category_code.value == "") {
		alert("게시글 분류를 선택해주세요.");
		bwFrm.category_code.focus();
		return;
	}

	if (bwFrm.content.value == "") {
		alert("게시글 내용을 작성해주세요.");
		bwFrm.content.focus();
		return;
	}

	loadContent('boardlist.html');
}

//글수정
function editBoard() {
	let bvFrm = document.boardViewForm;
	bvFrm.action = "editboard";
	loadContent('boardlist.html');

}

//글삭제
function deleteBoard() {
	let bvFrm = document.boardViewForm;
	if (confirm("게시글을 삭제하시겠습니까?")) {
		loadContent('boardlist.html');
	}
}

//목록갯수 변환
function changeListSize() {
	let blFrm = document.boardListForm;
	blFrm.page.value = 1;
	loadContent('boardlist.html');
}

//게시글 검색
function searchBoardList() {
	let blFrm = document.boardListForm;
	blFrm.page.value = 1;
	loadContent('boardlist.html');
}

//페이지 이동
function changePage(pageNum) {
	let blFrm = document.boardListForm;
	blFrm.page.value = pageNum;
	loadContent('boardlist.html');
}
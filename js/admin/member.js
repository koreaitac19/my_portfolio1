//목록갯수 변환
function changeListSize(){
	let mlFrm = document.memberListForm;
	mlFrm.page.value = 1;
	mlFrm.submit();
}

//회원 검색
function searchMemberList(){
	let mlFrm = document.memberListForm;
	mlFrm.page.value = 1;
	mlFrm.submit();
}

//페이지 이동
function changePage(pageNum){
	let mlFrm = document.memberListForm;
	mlFrm.page.value = pageNum;
	mlFrm.submit();
}
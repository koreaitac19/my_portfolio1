//매뉴버튼 토글 기능 (반응형으로 화면이 변경된 경우 매뉴 버튼 클릭)
function menuBtnToggle(){
	$("#navbarResponsive").toggleClass('show');
}

//레시피 등록 페이지로 이동
function moveToRegist() {
	location.href="/registrecipe";
}

//로그인 처리 엔터키
function Enter_Check(){        // 엔터키의 코드는 13입니다.
	if(event.keyCode == 13){
		document.frmLogin.submit(); // 폼 제출
	} return false;
}
 
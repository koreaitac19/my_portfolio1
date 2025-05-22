//회원가입 입력 체크
function ckfrm() {
	var frm = document.joinFrm;
	
	if(frm.member_id.value == "") {
		alert("아이디를 입력해주세요.");
		frm.member_id.focus();
		return;
	} else {
		if(!idCheck(frm.member_id.value)){
			alert("아이디는 영문 숫자 조합만 사용할 수 있습니다.");
			return;
		}
	}
	if(frm.member_pw.value == "") {
		alert("비밀번호를 입력해주세요.");
		frm.member_pw.focus();
		return;
	}
	/* 
	else {
		if(!pwCheck(frm.member_pw.value)){
			alert("패스워드는 문자, 숫자, 특수문자 조합으로 8자리 이상 입력하여야 합니다.");
			return;
		}
	}
	*/
	
	if(frm.again_pw.value == "") {
		alert("비밀번호 확인를 입력해주세요.");
		frm.again_pw.focus();
		return;
	}
	
	if(frm.member_pw.value != frm.again_pw.value){
		alert("비밀번호가 일치하지 않습니다. 확인 해주세요.");
		frm.again_pw.focus();
		return;
	}
	
	if(frm.member_nm.value == "") {
		alert("이름 입력해주세요.");
		frm.member_nm.focus();
		return;
	}
	if(frm.birthday.value == "") {
		alert("생일을 입력해주세요.");
		frm.birthday.focus();
		return;
	}
	
	if(frm.email.value == "") {
		alert("이메일을 입력해주세요.");
		frm.email.focus();
		return;
	} else {
		if(!emailCheck(frm.email.value)){
			alert("이메일 형식이 일치하지 않습니다.");
			return;
		}
	}
	
	if(frm.dupCheck.value == "N") {
		alert("아이디 중복을 확인해주세요.");
		frm.member_id.focus();
		return;
	}
	
	loadContent('login.html');
}

//다시 쓰기
function reset(){
	var frm = document.joinFrm;
	frm.reset();
}

//아이디 중복 체크
function duplication_id(){
	var member_id = $("#member_id").val();
	$.ajax({
		type : "get" ,
		async : true ,
		url : "/duplicationid" ,
		data : { "member_id" : member_id } ,
		success : function (data) {
			var responsData = JSON.parse(data);
			var msg = responsData.msg;
			if(msg == "N") $("#dupMsg").text("이미 사용중인 아이디 입니다.");
			else $("#dupMsg").text("사용할 수 있는 아이디 입니다.");
			
			$("#dupCheck").val(msg);
		},
		error : function (data, textStatus) {
			alert("데이터 전송 실패! \n관리자에게 문의 해주세요.");
			console.log("data", data);
			console.log("textStatus", textStatus);
		}
	});
}

//이메일 형식 체크
function emailCheck(email_address){     
	email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test(email_address)){ 
		return false; 
	}else{
		return true;
	}
}

//아이디 형식 체크
function idCheck(id){     
	var engNum =  /^[a-zA-Z0-9]*$/;
	if(!engNum.test(id)){ 
		return false; 
	}else{
		return true;
	}
}

//패스워드 체크 개발 편의상 미사용
function pwCheck(pw) {
	var password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
	if(!password.test(pw)){ 
		return false; 
	}else{
		return true;
	}
}


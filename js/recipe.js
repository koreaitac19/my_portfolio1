var stepCnt = 2;		//레시피 요리 상세 순번 추가 번호

//요리 상세 단계 추가
function addMaterialGroup() {
	var stepColor = (stepCnt%2) > 0 ? "" : "_1";
	
	var addHtml  = '<div id="divStepItem_' + stepCnt + '" class="cont_line pad_b_25">';
		addHtml += '<p class="cont_tit5' + stepColor + '" style="height: 160px;">STEP' + stepCnt + '</p>';
		addHtml += '<textarea name="cook_cont" id="step_text_' + stepCnt + '" class="form-control step_cont" placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요." style="height:160px; width:80%; resize:none;"></textarea>';
		addHtml += '<div class="cont_line">';
		addHtml += '<p class="cont_tit6">요리 사진</p>';
		addHtml += '<input type="file" name="sub_file" id="cook_file' + stepCnt +'" value="" class="form-control step_file" style="width:80%; ">';
		addHtml += '</div>';
		addHtml += '</div>';
	if(stepCnt > 15){
		alert("요리 단계는 최대 15단계까지만 가능합니다.");
	}else{
		$("#divStepArea").append(addHtml);			            	
		stepCnt++;	
	}
}

//요리 상세 단계 삭제
function removeMaterialGroup() {
	if(stepCnt > 2){
		if(confirm("마지막 STEP을 삭제하시겠습니까?")){
			stepCnt--;					         	
			$("#divStepItem_"+(stepCnt)).remove();			            	
		}
	} else {
		alert("요리 단계는 최소 1개가 있어야 합니다.");
	}
	
}

//메인 이미지 첨부시 미리보기용 클릭 제어
function browseMainFile() {
	$("#q_main_file").click();
}

//document가 준비되면 메인이미지 파일에 체인지 이벤트 적용
$(function(){
	$("#q_main_file").change(function(){
		setImageFromFile(this, '#mainPhotoHolder');
	});
});


//이미지 파일을 읽어서 변환 처리
function setImageFromFile(input, expression) {
	
    if (input.files && input.files[0])
    {
        var reader = new FileReader();
 
            reader.onload = function (e) {
                $(expression).attr('src', e.target.result);
           }
           reader.readAsDataURL(input.files[0]);
     }
}

//레시피 저장 유효성 체크
function saveRecipe(){
	let frm = document.recipeFrm;
	if(frm.recipe_nm.value == "") {
		alert("제목을 입력해주세요.");
		frm.recipe_nm.focus();
		return;
	}
	if(frm.recipe_sum.value == "") {
		alert("소개을 입력해주세요.");
		frm.recipe_sum.focus();
		return;
	}
	if(frm.category_code.value == "") {
		alert("카테고리를 선택해주세요.");
		frm.category_code.focus();
		return;
	}
	if(frm.quantity.value == "") {
		alert("요리가 몇 인분 인지 선택 해주세요.");
		frm.quantity.focus();
		return;
	}
	if(frm.cook_time.value == "") {
		alert("요리 시간을 선택해주세요.");
		frm.cook_time.focus();
		return;
	}
	if(frm.recipe_lv.value == "") {
		alert("요리 난이도를 선택해주세요.");
		frm.recipe_lv.focus();
		return;
	}
	if(frm.ingredients.value == "") {
		alert("요리 재료를 입력해주세요.");
		frm.ingredients.focus();
		return;
	}
	if(frm.img_file.value == "") {
		alert("메인이미지는 필수 입력입니다.");
		frm.img_file.focus();
		return;
	}
	if($("#step_text_1").val() == "") {
		alert("요리 순서는 최소 한개 이상 입력해주세요.");
		$("#step_text_1").focus();
		return;
	}
	
	loadContent('recipelist.html');
}

//별점 변경 처리
function chagePoint(num) {
	for(var i=0;5>i;i++){
		$("#star"+(i+1)).removeClass('on');
	}
	
	for(var i=0;num>i;i++){
		$("#star"+(i+1)).addClass('on');
	}
	
	if(num == 1) $("#point_text").text("별로에요");
	if(num == 2) $("#point_text").text("보통이요");
	if(num == 3) $("#point_text").text("괜찮아요");
	if(num == 4) $("#point_text").text("기대이상");
	if(num == 5) $("#point_text").text("강력추천");
	$("#point_value").val(num);
}


//textarea 바이트 수 체크하는 함수
function checkByte(obj){
    const maxByte = 1000; //최대 100바이트
    const text_val = obj.value; //입력한 문자
    const text_len = text_val.length; //입력한 문자수
    
    let totalByte=0;
    for(let i=0; i<text_len; i++){
    	const each_char = text_val.charAt(i);
        const uni_char = escape(each_char); //유니코드 형식으로 변환
        if(uni_char.length>4){
        	// 한글 : 2Byte
            totalByte += 2;
        }else{
        	// 영문,숫자,특수문자 : 1Byte
            totalByte += 1;
        }
    }
    
    if(totalByte>maxByte){
    	alert('최대 1000Byte까지만 입력가능합니다.');
    	$("#wirteBytesCount").text(totalByte);
        $("#wirteBytesCount").css("color", "red");
    }else{
    	$("#wirteBytesCount").text(totalByte);
        $("#wirteBytesCount").css("color", "green");
    }
}

//비동기방식 별점 평가 조회
function getRate(pageNum) {
	var recipe_num = $("#recipe_num").val();
	$.ajax({
		type : "get" ,
		async : true ,
		url : "/getrate" ,
		data : { "recipe_num" : recipe_num , "page" : pageNum } ,
		success : function (data) {
			var responsData = JSON.parse(data);
			var rate = responsData.rate;
			var html =  rateHtmlCreater(rate);
			$("#rateList").html(html);
			var pageHtml = ratePagingHtmlCreater(responsData.search[0]);
			$("#ratePaging").html(pageHtml);
			$("#totalRate").html(responsData.search[0].totDataCnt);
			$("#rateavg").html(responsData.rateavg);
			if(responsData.rateavg == 1) $("#ratetext").html("별로에요");
			if(responsData.rateavg == 2) $("#ratetext").html("보통이요");
			if(responsData.rateavg == 3) $("#ratetext").html("괜찮아요");
			if(responsData.rateavg == 4) $("#ratetext").html("기대이상");
			if(responsData.rateavg == 5) $("#ratetext").html("강력추천");
		},
		error : function (data, textStatus) {
			alert("데이터 전송 실패! \n관리자에게 문의 해주세요.");
			console.log("data", data);
			console.log("textStatus", textStatus);
		}
	});
}

//비동기 방식 별점 저장 처리
function saveRate() {
	var ratefrm = $("#rateForm");
	var formData = new FormData(ratefrm[0]);
	
	$.ajax({
		type : "POST" ,
		async : true ,
		url : "/saverate" ,
		dataType: 'json',
		data : formData ,
		processData: false,
		contentType: false,
		success : function (data) {
			var html =  rateHtmlCreater(data.rate);
			$("#rateList").html(html);
			var pageHtml = ratePagingHtmlCreater(data.search[0]);
			$("#ratePaging").html(pageHtml);
			$("#totalRate").html(data.search[0].totDataCnt);
			$("#rateavg").html(data.rateavg);
			if(data.rateavg == 1) $("#ratetext").html("별로에요");
			if(data.rateavg == 2) $("#ratetext").html("보통이요");
			if(data.rateavg == 3) $("#ratetext").html("괜찮아요");
			if(data.rateavg == 4) $("#ratetext").html("기대이상");
			if(data.rateavg == 5) $("#ratetext").html("강력추천");
		},
		error : function (data, textStatus) {
			alert("데이터 전송 실패! \n관리자에게 문의 해주세요.");
			console.log("data", data);
			console.log("textStatus", textStatus);
		},
		complete : function () {
			$("#rate_cont").val('');
			$("#wirteBytesCount").text(0);
		}
	});
}

//평가 내용 펼치기 접기
function accordionToggle(obj){
	console.log(obj);
	const parent = $(obj).parents();
	console.log(parent);

	parent.toggleClass('open');
}

//json 데이터 html으로 변환 처리
function rateHtmlCreater(data) {
	var html = '';
	for(var i=0; data.length > i; i++){
		html += '<li class="accordion-wrap">';
		html += '<a href="javascript:" class="accordion-head" onclick="accordionToggle(this);">';
		html += '<div class="accordion-head-info">';
		html += '<img class="stars" src="/img/icon/ico_star_' + data[i].point + '.png" alt="' + data[i].point + '점">';
		html += '<span class="date">' + data[i].reg_date + '</span>';
		html += '<span class="name">' + data[i].reg_member + '</span>';
		html += '</div>';
		html += '<div class="accordion-head-cont">';
		html += data[i].rate_cont;
		html += '</div>';
		html += '</a>';
		html += '<div class="accordion-body">';
		html += '<p class="text">';
		html += data[i].rate_cont;
		html += '</p>';
		html += '<div class="btns">';
		html += '</div>';
		html += '</div>';
		html += '</li>';
	}
	return html;
}

//json 데이터 페이징 처리
function ratePagingHtmlCreater(data) {
	var pageHtml = '';
	if(data.existPrevPage){
		pageHtml += '<a class="paging-side" href="#"><a href="javascript:getRate(1);" class="page arrow first"><span>처음</span></a></a>';
		pageHtml += '<a class="paging-side" href="#"><a href="javascript:getRate(' + (data.startPage - 1) + ');" class="page arrow prev"><span>이전</span></a></a>';
	}
	for(var i=data.startPage; data.endPage >= i; i++){
		if(data.page == i) pageHtml += '<a class="page number active" href="javascript:getRate(' + i + ')">' + i + '</a>';
		else pageHtml += '<a class="page number" href="javascript:getRate(' + i + ')">' + i + '</a>';
	}	
	if(data.existNextPage){
		pageHtml += '<a class="paging-side" href="#"><a href="javascript:getRate(' + (data.endPage + 1) + ');" class="page arrow next"><span>다음</span></a></a>';
		pageHtml += '<a class="paging-side" href="#"><a href="javascript:getRate(' + data.totPageCnt + ');" class="page arrow end"><span>끝</span></a></a>';
	}
	
	return pageHtml;
}

//로그인 아닐경우 로그인 요청 처리
function loginCheck() {
	if(confirm("평가를 위해서는 로그인이 필요합니다. ")){
		loadContent('login.html');
	}
}

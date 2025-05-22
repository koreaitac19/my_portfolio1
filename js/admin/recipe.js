//목록갯수 변환
function changeListSize(){
	let rlFrm = document.recipeListForm;
	rlFrm.page.value = 1;
	loadContent('/admin/recipelist.html');
}

//레시피 검색
function searchRecipeList(){
	let rlFrm = document.recipeListForm;
	rlFrm.page.value = 1;
	loadContent('/admin/recipelist.html');
}

//페이지 이동
function changePage(pageNum){
	let rlFrm = document.recipeListForm;
	rlFrm.page.value = pageNum;
	loadContent('/admin/recipelist.html');
}

//레시피 승인 처리
function approvalRecipe(approval) {
	var recipe_num = $("#recipe_num").val();
	if(approval == "Y"){
		if(confirm("레시피를 승인하면 모든 사용자가 볼 수 있습니다. \n승인 하겠습니까?")){
			loadContent('/admin/recipelist.html');
		}
	}else{
		if(confirm("레시피를 미승인 상태로 변경하면 레시피가 사용자에게 표시되지 않습니다. \n미승인 상태로 변경 하겠습니까?")){
			loadContent('/admin/recipelist.html');
		}
	}
	
}

//레시피 삭제처리()
function deleteRecipe() {
	var recipe_num = $("#recipe_num").val();
	if(confirm("레시피를 삭제하면 관리자를 통해서 복원하여야 합니다. \n삭제처리 하시겠습니까?")){
		loadContent('/admin/recipelist.html');
	}
	
}

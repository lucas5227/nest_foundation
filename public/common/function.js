function list_deleteOne(req, id) {
  url = req+'/'+id;
  console.log(url);
  $.ajax({
    type: 'DELETE',
    url: url,  // URL에 ID를 추가하여 전달
    async: true, // 비동기 요청으로 변경
    success: function (data, status) {
      console.log(data, status);
      alert("Deleted successfully");
      window.location.reload();
    },
    error: function (xhr, status, error) {
      console.error('Delete failed:', error);
      alert(`Delete failed: ${error}`);
    },
  });
}

function go_submit(action) {
  if (action === "delete" && confirm("삭제하시겠습니까?")) {
    document.getElementById('boardFrm').setAttribute('action', '/admin/post/delete');
    document.getElementById('boardFrm').setAttribute('method', 'post'); // method는 post로 설정
    document.getElementById('boardFrm').submit();
  }
}

// Summernote 초기화
$(document).ready(function() {
  $('#summernote').summernote({
    placeholder: '내용을 작성하세요.',
    tabsize: 2,
    height: 300,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
  });
});

function saveContent() {
  // 서머노트의 내용을 숨겨진 입력 필드에 복사
  const content = $('#summernote').summernote('code'); // 서머노트의 내용을 가져옴
  $('#summernote_content').val(content); // 내용을 숨겨진 필드에 저장
  // return true; // 폼 제출을 진행
  return true;
}

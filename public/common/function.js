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


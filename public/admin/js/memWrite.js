/* eslint-disable */
hideAll();
function hideAll() {
  $('#page_content').hide();
  $('#link_address').hide();
  $('#board_skin').hide();
  $('#preview_button').hide();
}
    $('#men_type').change(function () {
      hideAll(); // function.js에 있는 hideAll 함수 사용
      let type = $(this).val();

      switch (type) {
        case 'page':
          $('#page_content').show();
          $('#preview_button').show();
          //TODO: 서머노트가 초기화된 다음 텍스트의 값으로 높이 조정
          break;
        case 'link':  $('#link_address').show();  break;
        case 'board': $('#board_skin').show();  break;
      }
});
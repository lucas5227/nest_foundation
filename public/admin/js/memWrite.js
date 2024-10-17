hideAll();

function hideAll() {
  $('#page_content').hide();
  $('#link_address').hide();
  $('#board_skin').hide();
}

$('#men_type').change(function () {
  hideAll();
  let type = $(this).val();
  switch (type) {
    case 'page': $('#page_content').show(); break;
    case 'link': $('#link_address').show(); break;
    case 'board': $('#board_skin').show(); break;
  }
});

/* eslint-disable */
hideAll();
function hideAll() {
  $('#page_content').hide();
  $('#link_address').hide();
  $('#board_skin').hide();
  $('#preview_button').hide();
}
    $('#men_type').change(function () {
      hideAll();
      let type = $(this).val();

      switch (type) {
        case 'page':
          $('#page_content').show();
          $('#preview_button').show();
          break;
        case 'link':  $('#link_address').show();  break;
        case 'board': $('#board_skin').show();  break;
      }
});

function adjustEditorHeight() {
  let windowHeight = $(window).height();
  let editorOffset = $('#summernote').offset().top;
  let newHeight = windowHeight - editorOffset - 500;

  $('#summernote').summernote('destroy');
  $('#summernote').summernote({
    height: newHeight,
  });
}

$(document).ready(function() {
  adjustEditorHeight();
});

$(window).resize(function() {
  adjustEditorHeight();
});

/* eslint-disable */
// global variables
var tempSummernoteContent = '';

// Function to delete an item by ID
function list_deleteOne(req, id) {
  const url = `${req}/${id}`; // Build URL by appending ID
  $.ajax({
    type: 'DELETE',
    url: url,
    async: true,
    success: function (data, status) {
      console.log(data, status);
      alert('Deleted successfully');
      window.location.reload(); // Reload the page after deletion
    },
    error: function (xhr, status, error) {
      console.error('Delete failed:', error);
      alert(`Delete failed: ${error}`);
    },
  });
}

// Function to handle form submission with a delete action
function go_submit(action) {
  if (action === 'delete' && confirm('삭제하시겠습니까?')) {
    document
      .getElementById('boardFrm')
      .setAttribute('action', '/admin/post/delete');
    document.getElementById('boardFrm').setAttribute('method', 'post'); // Set method to POST
    document.getElementById('boardFrm').submit(); // Submit the form
  }
}

// Initialize Summernote editor
$(document).ready(function () {
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
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onImageUpload: function (files) {
        uploadImage(files[0]); // Call upload function with the uploaded file
      },
      onMediaDelete: function ($target) {
        const url = $target[0].src; // Get the image URL from the target
        deleteImage(url); // Call the delete function for the image
      },
      onKeyup: function (e) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          let now = $('#summernote').summernote('code');
          let extract = extractImageSources(now, tempSummernoteContent);
          console.log(extract);
          extract.forEach((url) => {
            deleteImage(url);
          });
        } else {
          tempContent();
        }
      },
    },
  });
});

// Function to upload an image to the server
function uploadImage(file) {
  const data = new FormData(); // Create a FormData object
  data.append('file', file); // Append the file to FormData
  data.append('type', 'summernote'); // Append type for identification

  $.ajax({
    url: '/minio/upload', // Server upload endpoint
    type: 'POST',
    data: data,
    processData: false, // Do not process the data
    contentType: false, // Do not set content type
    dataType: 'json', // Expect JSON response
    success: function (response) {
      // Insert the image URL into the Summernote editor
      if (response) {
        const imageUrl = '/minio/download/' + response.hashedName;
        console.log(imageUrl);
        $('#summernote').summernote('insertImage', imageUrl); // Insert image into the editor
      }
    },
    error: function (xhr, status, error) {
      console.error('Image upload failed:', error);
      alert('이미지 업로드에 실패했습니다.'); // Alert failure
    },
  });
}

// Function to delete an image from the server
function deleteImage(url) {
  const fileName = url.split('download/').pop();
  $.ajax({
    url: '/minio/delete',
    type: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify({ fileName: fileName }),
    success: function (response) {
      console.log('Image deleted successfully:', response);
    },
    error: function (xhr, status, error) {
      console.error('Image delete failed:', error);
      alert('이미지 삭제에 실패했습니다.'); // Alert failure
    },
  });
}

function tempContent() {
  const content = $('#summernote').summernote('code'); // Get content from Summernote
  tempSummernoteContent = content;
}

function extractImageSources(now, tempContent) {
  const parser = new DOMParser();
  const nowDoc = parser.parseFromString(now, 'text/html');
  const tempDoc = parser.parseFromString(tempContent, 'text/html');

  // 현재 이미지 소스 가져오기
  const currentImgElements = nowDoc.querySelectorAll('img');
  const currentSrcs = Array.from(currentImgElements).map(img => img.src.trim().toLowerCase());

  // 기존 이미지 소스 가져오기
  const existingImgElements = tempDoc.querySelectorAll('img');
  const existingSrcs = Array.from(existingImgElements).map(img => img.src.trim().toLowerCase());

  console.log('현재 이미지 소스:', currentSrcs);
  console.log('기존 이미지 소스:', existingSrcs);

  // 기존 이미지 소스 중 현재 소스에 없는 것들을 필터링
  const missingSrcs = existingSrcs.filter(src => !currentSrcs.includes(src));

  console.log('결과적으로 없어진 기존 이미지 소스:', missingSrcs);
  return missingSrcs;
}







// Function to save content from the Summernote editor to a hidden field
function saveContent() {
  const content = $('#summernote').summernote('code'); // Get content from Summernote
  $('#summernote_content').val(content); // Save to hidden field
  return true; // Allow form submission
}

// Select all checkboxes functionality
$(document).ready(function () {
  $('#selectAll').click(function () {
    $('input[name="chk[]"]').prop('checked', this.checked); // Toggle all checkboxes
  });
});

// Function to delete selected items
function delChecked(req) {
  const ids = $('input[name="chk[]"]:checked')
    .map(function () {
      return this.value; // Get values of checked items
    })
    .get();

  if (ids.length === 0) {
    alert('선택된 항목이 없습니다.'); // No items selected
    return;
  }

  if (confirm('삭제하시겠습니까?')) {
    $.ajax({
      type: 'DELETE',
      url: req,
      contentType: 'application/json',
      data: JSON.stringify({ ids: ids }), // Convert IDs to JSON string
      async: true, // Asynchronous request
      success: function (data, status) {
        console.log(data, status);
        alert('삭제되었습니다.');
        window.location.reload(); // Reload the page after deletion
      },
      error: function (xhr, status, error) {
        console.error('Delete failed:', error);
        alert('삭제에 실패했습니다.'); // Alert failure
      },
    });
  }
}

// Function to delete a single item
function deleteOne(req, id) {
  const ids = [id];
  if (confirm('삭제하시겠습니까?')) {
    $.ajax({
      type: 'DELETE',
      url: req,
      contentType: 'application/json',
      data: JSON.stringify({ ids: ids }), // Convert IDs to JSON string
      async: true, // Asynchronous request
      success: function (data, status) {
        console.log(data, status);
        alert('삭제되었습니다.');
        window.location.href = req; // Redirect after deletion
      },
      error: function (xhr, status, error) {
        console.error('Delete failed:', error);
        alert('삭제에 실패했습니다.'); // Alert failure
      },
    });
  }
}
